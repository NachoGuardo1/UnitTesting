import { HttpResponse, http } from "msw";
export const handlers = [
  //
  http.get(process.env.REACT_APP_API_URL + "products/categories", () => {
    return HttpResponse.json([
      {
        id: 1,
        name: "category mock 1",
      },
      {
        id: 2,
        name: "category mock 2",
      },
    ]);
  }),
  //
];
