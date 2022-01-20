import { Link } from 'react-router-dom';
import './About.scss';

function About() {
  return (
    <>
      <header>
        <span className='title'>About</span>
        <Link to="/">
          <div className="header-about">Back</div>
        </Link>
      </header>
      <div className="about-main">
        <h1>Beware: this site is under development (and will probably be for a while)</h1>
        <h2>What is the movie catalog?</h2>
        <p>
          The movie catalog is a search engine that you can use to find movies! Pretty self explanatory, isn't it?
        </p>
        <h2>Why is the movie catalog?</h2>
        <p>
          It started as a hobby project, and then boom: it was put on the web. I just basically wanted to practice 
          frontend development, so might as well just make something that is actually useful.
        </p>
        <h2>How is the movie catalog?</h2>
        <p>
          It was written in Typescript using React.js, uses The Movie DB API, and hosted is on Netlify. If you want to know more,
          check out the <a href="https://github.com/davimatyi/movie_catalog/" target="newtab">git repo</a>.
        </p>

      </div>
    </>
  );
}

export default About;