import { NavLink } from "react-router-dom";

export default function AdminMenu() {
  return (
    <>
      <div className="p-3 mt-2 mb-2 bg-light">
        <h4>Admin Links</h4>
      </div>

      <ul className="list-group list-unstyled">
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/category">
            Category
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/make">
            Make
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/model">
            Model
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/part">
            Part
          </NavLink>
        </li>
        <li>
          <NavLink className="list-group-item" to="/dashboard/admin/parts">
            Parts
          </NavLink>
        </li>
      </ul>
    </>
  );
}
