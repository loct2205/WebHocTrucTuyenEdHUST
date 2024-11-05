import ChangeProfilePicture from "./ChangeProfilePicture"
import DeleteAccount from "./DeleteAccount"
import EditProfile from "./EditProfile"
import UpdatePassword from "./UpdatePassword"

export default function Settings() {
  return (
    <div className="settings-container mx-auto p-6">
      <h1 className="mb-14 text-3xl font-medium text-richblack-5 font-boogaloo text-center sm:text-left">
        Chỉnh sửa Hồ sơ
      </h1>
      
      {/* Change Profile Picture */}
      <section className="mb-8">
        <ChangeProfilePicture />
      </section>
      
      {/* Profile */}
      <section className="mb-8">
        <EditProfile />
      </section>
      
      {/* Password */}
      <section className="mb-8">
        <UpdatePassword />
      </section>
      
      {/* Delete Account */}
      <section className="mb-8">
        <DeleteAccount />
      </section>
    </div>
  )
}
