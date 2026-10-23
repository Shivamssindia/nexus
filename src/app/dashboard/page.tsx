"use client";

import { JSX, useEffect, useState } from "react";
import axios from "axios";
import './dashboard.css';

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import Client from "@/components/dashboard/Client";
import Consultent from "@/components/dashboard/Consultent";
import Manager from "@/components/dashboard/Manager";
import Dhead from "@/components/dashboard/Dhead";
import Dbde from "@/components/dashboard/Dbde";
import Dhr from "@/components/dashboard/Dhr";
import Dfinance from "@/components/dashboard/Dfinance";
import Dcore from "@/components/dashboard/Dcore";
import NoRolePage from "@/components/dashboard/no-role";
import { useAuth } from "@/contexts/AuthContext";

export default function DashboardPage() {
  const [roleComponent, setRoleComponent] = useState<JSX.Element | null>(null);
  const [loading, setLoading] = useState(true);
  const [userRoles, setUserRoles] = useState<any[]>([]);
  const [currentRole, setCurrentRole] = useState<any>(null);
  const { user } = useAuth();

  const getDirectorComponent = (departmentId: number) => {
    switch (departmentId) {
      case 1: return <Dhead />;      // HEAD department director
      case 2: return <Dhr />;         // Human Resource director
      case 3: return <Dbde />;        // Business Development director
      case 4: return <Dfinance />;    // Finance director
      case 5: return <Dcore />;       // CSE director
      default: return <Dcore />;      // 5+ department ke liye Core director
    }
  };

  const getComponentForRole = (role: any, employee: any) => {
    // Agar role null ya undefined hai toh NoRolePage
    if (!role || !role.ptype) {
      return <NoRolePage />;
    }

    if (role.ptype === "CLIENT") {
      // return <Client />;
      return <NoRolePage />;
    }
    else if (role.ptype === "CONSULTANT") {
      return <Consultent />;
    }
    else if (role.ptype === "EMP") {
      const stype = role.stype?.toUpperCase();
      
      // MANAGER: hamesha Manager page (kisi bhi department ke liye)
      if (stype === "MANAGER") {
        return <Manager />;
      }
      // DIRECTOR: department dekhna hoga
      else if (stype === "DIRECTOR") {
        return getDirectorComponent(employee?.departmentId);
      }
      // Other EMP types: default Core component
      else {
        return <Dcore />;
      }
    }
    return <NoRolePage />;
  };

  const getUserDetails = async () => {
    try {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/getmydetails`,
        { withCredentials: true }
      );

      console.log("User details response:", res.data);

      const data = res?.data?.data;

      if (!data) {
        console.error("Invalid response");
        setRoleComponent(<NoRolePage />);
        setLoading(false);
        return;
      }

      const roles = data.roles || [];
      const employee = data.employee;
      
      setUserRoles(roles);
      
      localStorage.setItem('userRoles', JSON.stringify(roles));
      localStorage.setItem('userEmployee', JSON.stringify(employee));

      // ✅ IMPORTANT: Agar roles empty hai toh NoRolePage set karo
      if (roles.length === 0) {
        console.log("No roles found, showing NoRolePage");
        setCurrentRole(null);
        setRoleComponent(<NoRolePage />);
      } else {
        const initialRole = roles[0];
        setCurrentRole(initialRole);
        setRoleComponent(getComponentForRole(initialRole, employee));
      }

    } catch (error) {
      console.error("Error fetching user details", error);
      setRoleComponent(<NoRolePage />);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleRoleChange = (event: CustomEvent) => {
      const { role, employee } = event.detail;
      setCurrentRole(role);
      
      const empData = employee || JSON.parse(localStorage.getItem('userEmployee') || '{}');
      setRoleComponent(getComponentForRole(role, empData));
    };

    window.addEventListener('roleChanged', handleRoleChange as EventListener);
    return () => {
      window.removeEventListener('roleChanged', handleRoleChange as EventListener);
    };
  }, []);

  useEffect(() => {
    getUserDetails();
  }, []);
  
  console.log("Current Role:", currentRole);
  console.log("User Roles:", userRoles);
  
  return (
    <>
      <Navbar currentRole={currentRole} userRoles={userRoles} />
      
      <main
        style={{
          marginTop: "80px",
          minHeight: "calc(100vh - 160px)",
          padding: "20px",
          width: "100%",
          boxSizing: "border-box"
        }}
      >
        {loading ? (
          <p className="loader"><img src="https://cdn.pixabay.com/animation/2025/05/05/15/47/15-47-41-779_512.gif" alt="" /></p>
        ) : (
          <>
            {roleComponent}
          </>
        )}
      </main>
    </>
  );
}






// "use client";

// import { JSX, useEffect, useState } from "react";
// import axios from "axios";
// import './dashboard.css';

// import Navbar from "@/components/Navbar";
// import Footer from "@/components/Footer";
// import Client from "@/components/dashboard/Client";
// import Consultent from "@/components/dashboard/Consultent";
// import Manager from "@/components/dashboard/Manager";
// import Dhead from "@/components/dashboard/Dhead";
// import Dbde from "@/components/dashboard/Dbde";
// import Dhr from "@/components/dashboard/Dhr";
// import Dfinance from "@/components/dashboard/Dfinance";
// import Dcore from "@/components/dashboard/Dcore";
// import NoRolePage from "@/components/dashboard/no-role";
// import { useAuth } from "@/contexts/AuthContext";

// export default function DashboardPage() {
//   const [roleComponent, setRoleComponent] = useState<JSX.Element | null>(null);
//   const [loading, setLoading] = useState(true);
//   const [userRoles, setUserRoles] = useState<any[]>([]);
//   const [currentRole, setCurrentRole] = useState<any>(null);
//   const { user } = useAuth();

//   const getDirectorComponent = (departmentId: number) => {
//     switch (departmentId) {
//       case 1: return <Dhead />;      // HEAD department director
//       case 2: return <Dhr />;         // Human Resource director
//       case 3: return <Dbde />;        // Business Development director
//       case 4: return <Dfinance />;    // Finance director
//       case 5: return <Dcore />;       // CSE director
//       default: return <Dcore />;      // 5+ department ke liye Core director
//     }
//   };

//   const getComponentForRole = (role: any, employee: any) => {
//     if (role.ptype === "CLIENT") {
//       return <Client />;
//     }
//     else if (role.ptype === "CONSULTANT") {
//       return <Consultent />;
//     }
//     else if (role.ptype === "EMP") {
//       const stype = role.stype?.toUpperCase();
      
//       // MANAGER: hamesha Manager page (kisi bhi department ke liye)
//       if (stype === "MANAGER") {
//         return <Manager />;
//       }
//       // DIRECTOR: department dekhna hoga
//       else if (stype === "DIRECTOR") {
//         return getDirectorComponent(employee?.departmentId);
//       }
//       // Other EMP types: default Core component
//       else {
//         return <Dcore />;
//       }
//     }
//     return <NoRolePage />;
//   };

//   const getUserDetails = async () => {
//     try {
//       const res = await axios.get(
//         `${process.env.NEXT_PUBLIC_API_URL}/api/getmydetails`,
//         { withCredentials: true }
//       );

//       console.log("User details response:", res.data);

//       const data = res?.data?.data;

//       if (!data) {
//         console.error("Invalid response");
//         return;
//       }

//       const roles = data.roles || [];
//       const employee = data.employee;
      
//       setUserRoles(roles);
      
//       localStorage.setItem('userRoles', JSON.stringify(roles));
//       localStorage.setItem('userEmployee', JSON.stringify(employee));

//       if (roles.length > 0) {
//         const initialRole = roles[0];
//         setCurrentRole(initialRole);
//         setRoleComponent(getComponentForRole(initialRole, employee));
//       }

//     } catch (error) {
//       console.error("Error fetching user details", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   useEffect(() => {
//     const handleRoleChange = (event: CustomEvent) => {
//       const { role, employee } = event.detail;
//       setCurrentRole(role);
      
//       const empData = employee || JSON.parse(localStorage.getItem('userEmployee') || '{}');
//       setRoleComponent(getComponentForRole(role, empData));
//     };

//     window.addEventListener('roleChanged', handleRoleChange as EventListener);
//     return () => {
//       window.removeEventListener('roleChanged', handleRoleChange as EventListener);
//     };
//   }, []);

//   useEffect(() => {
//     getUserDetails();
//   }, []);
  
//   console.log("Current Role:", currentRole);
//   console.log("User Roles:", userRoles);
  
//   return (
//     <>
//       <Navbar currentRole={currentRole} userRoles={userRoles} />
      
//       <main
//         style={{
//           marginTop: "80px",
//           minHeight: "calc(100vh - 160px)",
//           padding: "20px",
//           width: "100%",
//           boxSizing: "border-box"
//         }}
//       >
//         {loading ? (
//           <p className="loader"><img src="https://cdn.pixabay.com/animation/2025/05/05/15/47/15-47-41-779_512.gif" alt="" /></p>
//         ) : (
//           <>
//             {roleComponent}
//           </>
//         )}
//       </main>
//     </>
//   );
// }