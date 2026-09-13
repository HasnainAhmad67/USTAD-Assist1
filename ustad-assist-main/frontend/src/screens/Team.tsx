import { ArrowRight, Linkedin, UserRound, UsersRound } from 'lucide-react';

type Props = { onHome: () => void };

type SpritePosition = 'left' | 'center' | 'right';

type Profile = {
  name: string;
  role: string;
  contribution: string;
  image?: string;
  spritePosition?: SpritePosition;
  linkedin?: string;
  featured?: boolean;
  gender: 'male' | 'female';
};

const profiles: Profile[] = [
  {
    name: 'Hasnain Ahmad',
    role: 'Team Leader & AI Engineer',
    contribution:
      'Designed and built the complete Ustad Assist project, including its safety-first retrieval and grounding workflow.',
    image: '/team/hasnain-ahmad.jpg',
    linkedin: 'https://www.linkedin.com/in/hasnain-ahmad-047210349/',
    featured: true,
    gender: 'male',
  },
  {
    name: 'Sharjeel Sarwar',
    role: 'Team Member',
    contribution:
      'Contributing to the development and delivery of the Ustad Assist platform.',
    image: '/team/sharjeel-sarwar.png',
    gender: 'male',
  },
  {
    name: 'Ghulam Ahmed',
    role: 'Team Member',
    contribution:
      'Supporting the design and development of an evidence-led troubleshooting experience.',
    image: '/team/ghulam-ahmed.jpeg',
    gender: 'male',
  },
  {
    name: 'Minahil Saleem',
    role: 'Team Member',
    contribution:
      'Contributing to the project research, documentation, and user experience.',
    image: '/team/team-girls.png',
    spritePosition: 'left',
    gender: 'female',
  },
  {
    name: 'Laraib Khan',
    role: 'Team Member',
    contribution:
      'Contributing to the project research, documentation, and user experience.',
    image: '/team/team-girls.png',
    spritePosition: 'center',
    gender: 'female',
  },
  {
    name: 'Durdana Rehman',
    role: 'Team Member',
    contribution:
      'Contributing to the project research, documentation, and user experience.',
    image: '/team/team-girls.png',
    spritePosition: 'right',
    gender: 'female',
  },
];

function ProfileVisual({ profile }: { profile: Profile } ) {
  if (!profile.image) {
    return (
      <span className={`team-avatar-icon ${profile.gender}`}>
        <UserRound size={42} strokeWidth={1.35} />
      </span>
    );
  }

  if (profile.spritePosition) {
    return (
      <span
        className="team-avatar-image team-avatar-sprite"
        role="img"
        aria-label={`${profile.name} profile`}
        style={{
          backgroundImage: `url(${profile.image})`,
          backgroundPosition: `${profile.spritePosition} center`,
        }}
      />
    );
  }

  return (
    <img
      className="team-avatar-image"
      src={profile.image}
      alt={`${profile.name} profile`}
    />
  );
}

export function Team({ onHome }: Props) {
  return (
    <div className="team-3d-page">
      <section className="team-3d-hero">
        <div className="team-hero-copy">
          <div className="team-orbit-label">
            <span className="orbit-dot" /> USTAD ASSIST / TEAM
          </div>

          <h1>
            Built by people who care about <span>clarity.</span>
          </h1>

          <p>
            Meet the team behind an evidence-led troubleshooting experience for
            critical electrical equipment.
          </p>

          <div className="team-hero-stats">
            <div>
              <strong>06</strong>
              <span>Project profiles</span>
            </div>

            <div>
              <strong>01</strong>
              <span>AI-led system</span>
            </div>

            <div>
              <strong>100%</strong>
              <span>Built with purpose</span>
            </div>
          </div>
        </div>

        <div className="team-hero-orbit">
          <div className="orbit-ring ring-one" />
          <div className="orbit-ring ring-two" />

          <div className="orbit-core">
            <UsersRound size={36} />
            <span>
              Human
                

              intelligence
            </span>
          </div>

          <span className="orbit-tag tag-one">SAFETY</span>
          <span className="orbit-tag tag-two">AI</span>
          <span className="orbit-tag tag-three">TRUST</span>
        </div>
      </section>

      <section className="team-section-heading">
        <div>
          <p className="eyebrow">The people behind the product</p>
          <h2>A small team with a serious mission.</h2>
        </div>

        <span className="team-index">01 / 02</span>
      </section>

      <section className="team-3d-grid">
        {profiles.map((profile, index) => (
          <article
            className={`team-3d-card ${
              profile.featured ? 'leader-card' : ''
            }`}
            key={profile.name}
          >
            <div className="team-card-number">
              {String(index + 1).padStart(2, '0')}
            </div>

            <div className="team-avatar-wrap">
              <ProfileVisual profile={profile} />
            </div>

            <div className="team-card-body">
              <span className="team-role">
                {profile.role || 'Role to be added'}
              </span>

              <h3>{profile.name}</h3>

              <p>
                {profile.contribution ||
                  'Profile details will be added by the project team.'}
              </p>

              {profile.linkedin && (
                <a
                  className="team-linkedin"
                  href={profile.linkedin}
                  target="_blank"
                  rel="noreferrer"
                >
                  <Linkedin size={15} />
                  View LinkedIn
                  <ArrowRight size={14} />
                </a>
              )}
            </div>

            {profile.featured && (
              <span className="team-featured-badge">LEAD PROFILE</span>
            )}
          </article>
        ))}
      </section>

      <section className="team-3d-note">
        <div className="note-mark">UA</div>

        <div>
          <p className="eyebrow">A shared standard</p>
          <h2>Assist, don’t guess.</h2>
          <p>
            Every role on this page supports the same principle: make technical
            information clearer, safer, and easier to act on.
          </p>
        </div>

        <button className="button button-primary" onClick={onHome}>
          Explore the product
          <ArrowRight size={16} />
        </button>
      </section>
    </div>
  );
}
