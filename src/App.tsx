// React import removed as it is not used in this file
import Hero from './components/Hero';
import CorePillars from './components/CorePillars';
import Experience from './components/Experience';
import Company from './components/Company';
import Contact from './components/Contact';

function App() {
  return (
    <main className="w-full">
      <Hero />
      <CorePillars />
      <Experience />
      <Company />
      <Contact />
    </main>
  );
}

export default App;
