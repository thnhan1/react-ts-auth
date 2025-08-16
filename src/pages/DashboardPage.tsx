import { Link } from "react-router-dom";

export function DashboardPage() {
  return <div>
    <div>
      <Link to="/profile">Profile</Link>
    </div>
    <div>
      <Link to="/settings">Settings</Link>
    </div>  
  </div>;
}

