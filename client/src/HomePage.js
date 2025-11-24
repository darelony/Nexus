import "./HomePage.css";

export default function HomePage() {
  return (
    <div className="home-wrapper">

      {/* HERO */}
      <section className="hero">
        <div className="hero-content">
          <h1>Welcome to Nexus University</h1>
          <p>Where innovation, knowledge, and global culture meet.</p>
          <a href="/login" className="btn-primary">Login</a>
        </div>
      </section>

      {/* FEATURE SECTION */}
      <section className="feature">

        <div className="feature-left">
          <h2 className="feature-title">Tradition. Excellence. Innovation.</h2>

          <p className="feature-desc">
            Founded in 1984, Nexus University has become one of the most respected
            institutions for business, technology, and engineering. Our mission is
            to help students grow through real-world learning, global partnerships,
            and modern academic programs.
          </p>

          <p className="feature-desc">
            For more than 40 years, we have shaped leaders, innovators, and
            professionals ready for the challenges of tomorrow.
          </p>

          {/* PROGRAM GRID */}
          <div className="program-grid-inline">
            <div className="program-card">Business Management</div>
            <div className="program-card">Computer Science</div>
            <div className="program-card">Engineering</div>
            <div className="program-card">Marketing</div>
            <div className="program-card">Architecture</div>
            <div className="program-card">Finance</div>
          </div>
        </div>

        <img
          src="/campus2.png"
          alt="Campus"
          className="feature-img-small"
        />
      </section>

      {/* STUDENT STORIES */}
      <section className="stories">
        <h2>Student Stories</h2>

        <div className="story-grid">

          <div className="story-card">
            <img src="/student1.png" alt="Student" />
            <h3>01</h3>
            <p>“Nexus University changed my perspective on business... I gained confidence and real skills.”</p>
            <span>- Maria Petrović, Business Student</span>
          </div>

          <div className="story-card">
            <img src="/student2.png" alt="Student" />
            <h3>02</h3>
            <p>“World-class labs, competitions, mentors... Nexus shaped my engineering mindset.”</p>
            <span>- Nicholas Marković, Engineering</span>
          </div>

          <div className="story-card">
            <img src="/student3.png" alt="Student" />
            <h3>03</h3>
            <p>“The campus community helped me build friendships and develop strong leadership skills.”</p>
            <span>- Ivana Stojanović, Architecture</span>
          </div>

          <div className="story-card">
            <img src="/student4.png" alt="Student" />
            <h3>04</h3>
            <p>“Professors encouraged creativity and supported me during my internship abroad.”</p>
            <span>- Luka Đorđević, Marketing</span>
          </div>

          

        </div>
      </section>

      <footer className="footer">
        © {new Date().getFullYear()} Nexus University — All rights reserved.
      </footer>

    </div>
  );
}
