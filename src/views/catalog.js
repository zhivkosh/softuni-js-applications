import { getAllSolutions } from "../data/solutions.js";
import { html, render } from "../lib.js";

const catalogTemplate = (solutions) => html`
  <h2>Solutions</h2>
  <section id="solutions">
    <!-- Display a div with information about every post (if any)-->
    ${solutions.length
      ? solutions.map(solutionTemplate)
      : html`<h2 id="no-solution">No Solutions Added.</h2>`}
  </section>
`;

const solutionTemplate = (solution) => html`
  <div class="solution">
    <img src=${solution.imageUrl} alt="example3" />
    <div class="solution-info">
      <h3 class="type">${solution.type}</h3>
      <p class="description">${solution.description}</p>
      <a class="details-btn" href="/catalog/${solution._id}">Learn More</a>
    </div>
  </div>
`;

export async function showCatalog(ctx) {
  const solutions = await getAllSolutions();
  render(catalogTemplate(solutions));
}
