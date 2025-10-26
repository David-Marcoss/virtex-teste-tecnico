import HomePage from "@/pages/home";
import { Navigate, Route, Routes } from "react-router-dom";

export const RoutesApp = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};
