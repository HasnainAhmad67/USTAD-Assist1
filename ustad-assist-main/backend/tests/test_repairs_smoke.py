from engine.contracts import NormalizedRecord, Query
from engine.retrieval.evidence_assembler import retrieve_evidence
from engine.retrieval.semantic_match import SemanticMatcher
from app.schemas import TroubleshootRequest


def test_source_contract_rejects_unknown_mode():
    try:
        TroubleshootRequest(
            equipment_category="ups",
            manufacturer="Eaton",
            model="X",
            source="other",
        )
    except Exception:
        return
    raise AssertionError("unknown source mode must be rejected")


def test_semantic_fallback_keeps_code_and_symptom_context():
    record = NormalizedRecord(
        record_id="r1",
        equipment_category="ups",
        manufacturer="Eaton",
        model="X",
        model_aliases=[],
        model_family=[],
        manual_title="Manual",
        manual_version=None,
        manual_language="English",
        code="E01",
        issue_type="alarm",
        issue_title="Over temperature",
        meaning="Temperature is high",
        possible_causes=["blocked airflow"],
        troubleshooting_steps=[],
        safe_user_checks=[],
        technician_only_checks=[],
        safety_warning="",
        global_safety_notes=[],
        source=__import__("engine.contracts", fromlist=["SourceCitation"]).SourceCitation(manual_title="Manual", page="1"),
        verification_status="verified",
        verification_notes=None,
    )

    class KB:
        def verified_records(self):
            return [record]

    class Capture:
        def __init__(self):
            self.query = None
        def search(self, query, candidates):
            self.query = query
            return []

    matcher = Capture()
    result = retrieve_evidence(
        KB(), Query("ups", "Eaton", "X", code="unknown", symptom="blocked airflow"), matcher
    )
    assert result.evidence_bundle is None
    assert matcher.query == "unknown blocked airflow"


def test_semantic_matcher_still_handles_normal_queries():
    assert SemanticMatcher().search("over temperature", []) == []


if __name__ == "__main__":
    test_source_contract_rejects_unknown_mode()
    test_semantic_fallback_keeps_code_and_symptom_context()
    test_semantic_matcher_still_handles_normal_queries()
    print("repair smoke checks passed")
