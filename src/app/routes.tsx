import { createBrowserRouter } from "react-router";
import { Layout } from "./components/Layout";
import { Home } from "./components/Home";
import { LatestBooks } from "./components/LatestBooks";
import { AllWorks } from "./components/AllWorks";
import { BookDetail } from "./components/BookDetail";
import { BookReader } from "./components/BookReader";
import { AdminPanel } from "./components/AdminPanel";

export const router = createBrowserRouter(
  [
    {
      path: "/",
      Component: Layout,
      children: [
        { index: true, Component: Home },
        { path: "latest", Component: LatestBooks },
        { path: "works", Component: AllWorks },
        { path: "book/:id", Component: BookDetail },
        { path: "book/:id/read/:chapterId", Component: BookReader },
        { path: "admin", Component: AdminPanel },
      ],
    },
  ],
  {
    basename: "/Author-s-Personal-Website",
  }
);
