import withAuth from '../hoc/withAuth';

const ManagementPage = ({ user }) => {
  return (
    <div>
      <h1>Welcome, {user.role}</h1>
      <p>This page is only accessible by admins and managers!</p>
    </div>
  );
};

// Use the HOC and pass the allowed roles, in this case 'admin' and 'manager'
export default withAuth(ManagementPage, "['admin', 'manager']");
