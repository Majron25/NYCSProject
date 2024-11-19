import { useState } from "react";
import withAuth from "../hoc/withAuth";
import AccountTab from "../components/managementtabs/AccountTab";
import SettingsTab from "../components/managementtabs/SettingsTab";
import ProductsTab from "../components/managementtabs/ProductsTab";

const ManagementPage = ({ user }) => {
  const [activeTab, setActiveTab] = useState("account"); // Default active tab is 'account'

  const renderTabContent = () => {
    switch (activeTab) {
      case "account":
        return <AccountTab />;
      case "settings":
        return <SettingsTab />;
      case "products":
        return <ProductsTab />;
      default:
        return <AccountTab />;
    }
  };

  return (
    <div className="flex">
      <div className="w-1/4 bg-gray-200 p-4">
        <h1>Welcome, {user.role}</h1>
        <p>This page is only accessible by admins and managers!</p>

        {/* Tab Navigation */}
        <div className="space-y-4">
          <button
            className={`w-full py-2 px-4 text-left ${
              activeTab === "account" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setActiveTab("account")}
          >
            Accounts
          </button>
          <button
            className={`w-full py-2 px-4 text-left ${
              activeTab === "settings" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setActiveTab("settings")}
          >
            Settings
          </button>
          <button
            className={`w-full py-2 px-4 text-left ${
              activeTab === "products" ? "bg-blue-500 text-white" : ""
            }`}
            onClick={() => setActiveTab("products")}
          >
            Products
          </button>
        </div>
      </div>

      {/* Tab Content */}
      <div className="w-3/4 p-4">{renderTabContent()}</div>
    </div>
  );
};

// Use the HOC and pass the allowed roles, in this case 'admin' and 'manager'
export default withAuth(ManagementPage, "['admin', 'manager']");
