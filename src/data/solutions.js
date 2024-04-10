import { del, get, post, put } from "./request.js";

const endpoints = {
  dashboard: "/data/solutions?sortBy=_createdOn%20desc",
  solutions: "/data/solutions",
  solutionById: "/data/solutions/",
};

export async function getAllSolutions() {
  return get(endpoints.dashboard);
}

export async function getSolutionById(id) {
  return get(endpoints.solutionById + id);
}

export async function createSolution(type, imageUrl, description, learnMore) {
  return post(endpoints.solutions, {
    type,
    imageUrl,
    description,
    learnMore,
  });
}

export async function updateSolution(id, data) {
  return put(endpoints.solutionById + id, data);
}

export async function deleteSolution(id) {
  return del(endpoints.solutionById + id);
}
