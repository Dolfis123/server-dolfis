import React from "react";
import Sidebar from "../../components/admin/Sidebar";
import Navbar from "../../components/admin/Navbar";

function BerandaAdmin() {
  return (
    <div>
      {/* <!-- SIDEBAR --> */}
      <Sidebar activeComponent="Beranda" />
      {/* <!-- CONTENT --> */}
      <section id="content">
        {/* <!-- NAVBAR --> */}
        <Navbar />
        {/* <!-- NAVBAR --> */}
        <div class="order p-4 bg-white shadow-md rounded-md">
          <div class="head flex justify-between items-center mb-4">
            <h3 class="text-lg font-semibold">Recent Orders</h3>
            <div>
              <i class="bx bx-search text-xl mr-2 cursor-pointer"></i>
              <i class="bx bx-filter text-xl cursor-pointer"></i>
            </div>
          </div>
          <table class="min-w-full bg-white border-collapse">
            <thead>
              <tr>
                <th class="py-2 px-4 border-b border-gray-200 text-left">
                  User
                </th>
                <th class="py-2 px-4 border-b border-gray-200 text-left">
                  Date Order
                </th>
                <th class="py-2 px-4 border-b border-gray-200 text-left">
                  Status
                </th>
              </tr>
            </thead>
            <tbody>
              <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b border-gray-200 flex items-center">
                  <img
                    src="img/people.png"
                    alt="User"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <p>John Doe</p>
                </td>
                <td class="py-2 px-4 border-b border-gray-200">01-10-2021</td>
                <td class="py-2 px-4 border-b border-gray-200">
                  <span class="status text-green-500">Completed</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b border-gray-200 flex items-center">
                  <img
                    src="img/people.png"
                    alt="User"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <p>John Doe</p>
                </td>
                <td class="py-2 px-4 border-b border-gray-200">01-10-2021</td>
                <td class="py-2 px-4 border-b border-gray-200">
                  <span class="status text-yellow-500">Pending</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b border-gray-200 flex items-center">
                  <img
                    src="img/people.png"
                    alt="User"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <p>John Doe</p>
                </td>
                <td class="py-2 px-4 border-b border-gray-200">01-10-2021</td>
                <td class="py-2 px-4 border-b border-gray-200">
                  <span class="status text-blue-500">Process</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b border-gray-200 flex items-center">
                  <img
                    src="img/people.png"
                    alt="User"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <p>John Doe</p>
                </td>
                <td class="py-2 px-4 border-b border-gray-200">01-10-2021</td>
                <td class="py-2 px-4 border-b border-gray-200">
                  <span class="status text-yellow-500">Pending</span>
                </td>
              </tr>
              <tr class="hover:bg-gray-100">
                <td class="py-2 px-4 border-b border-gray-200 flex items-center">
                  <img
                    src="img/people.png"
                    alt="User"
                    class="w-8 h-8 rounded-full mr-2"
                  />
                  <p>John Doe</p>
                </td>
                <td class="py-2 px-4 border-b border-gray-200">01-10-2021</td>
                <td class="py-2 px-4 border-b border-gray-200">
                  <span class="status text-green-500">Completed</span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        {/* <!-- MAIN --> */}
        <main>Beranda</main>
        {/* <!-- MAIN --> */}
      </section>
      {/* <!-- CONTENT --> */}
    </div>
  );
}

export default BerandaAdmin;
