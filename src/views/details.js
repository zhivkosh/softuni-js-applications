import { deleteSolution, getSolutionById } from "../data/solutions.js";
import { html, render, page } from "../lib.js";
import { getUserData } from "../util.js";

const detailsTemplate = (data, hasUser, isOwner, onDelete) => html`
  <section id="details">
    <div id="details-wrapper">
      <img id="details-img" src=${data.imageUrl} alt="example1" />
      <div>
        <p id="details-type">${data.type}</p>
        <div id="info-wrapper">
          <div id="details-description">
            <p id="description">${data.description}</p>
            <p id="more-info">${data.learnMore}</p>
          </div>
        </div>
        <h3>Like Solution:<span id="like">0</span></h3>

        <!--Edit and Delete are only for creator-->
        ${hasUser
          ? html`<div id="action-buttons">
              ${isOwner
                ? html`<a href="/edit/${data._id}" id="edit-btn">Edit</a>
                    <a
                      href="javascript:void(0)"
                      id="delete-btn"
                      @submit=${onDelete}
                      >Delete</a
                    >`
                : html`<a href="javascript:void(0)" id="like-btn">Like</a>`}
            </div>`
          : null}
      </div>
    </div>
  </section>
`;

export async function showDetails(ctx) {
  const id = ctx.params.id;
  const solution = await getSolutionById(id);

  const user = getUserData();
  const hasUser = !!user;
  const isOwner = hasUser && user._id == solution._ownerId;

  render(detailsTemplate(solution, hasUser, isOwner, onDelete));

  async function onDelete() {
    const choice = confirm("Are you sure?");

    if (choice) {
      await deleteSolution(id);
      page.redirect("/catalog");
    }
  }
}
