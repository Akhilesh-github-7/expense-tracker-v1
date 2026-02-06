import React, { useContext, useState } from 'react'
import Modal from '../Modal'
import { UserContext } from '../../context/UserContext'
import ProfilePhotoSelector from '../inputs/ProfilePhotoSelector'
import Input from '../inputs/Input'
import uploadImage from '../../Utils/uploadImage'
import axiosInstance from '../../Utils/axiosInstance'
import { API_PATHS } from '../../Utils/apiPaths'
import toast from 'react-hot-toast'
import { getProfileImageUrl } from '../../Utils/helper'

const ProfileModal = ({ isOpen, onClose }) => {
    const { user, updateUser } = useContext(UserContext)
    const [fullName, setFullName] = useState(user?.fullName || "")
    const [profilePic, setProfilePic] = useState(null) // New file to upload
    const [isLoading, setIsLoading] = useState(false)

    const handleUpdateProfile = async () => {
        if (!fullName.trim()) {
            toast.error("Name is required")
            return
        }

        setIsLoading(true)
        try {
            let profileImageUrl = user?.profileImageUrl

            // If profilePic is null, it means no new file was selected.
            // But we need to know if the user explicitly removed the existing one.
            // For now, let's assume if profilePic is null and we had an image, 
            // and the ProfilePhotoSelector was "cleared", we should update.
            // To keep it simple: If profilePic is a File, upload and update.
            // If the user wants to remove, we need a way to trigger that.
            
            if (profilePic instanceof File) {
                const imgUploadRes = await uploadImage(profilePic)
                profileImageUrl = imgUploadRes.imageUrl || ""
            } else if (profilePic === "REMOVE") {
                profileImageUrl = ""
            }

            const response = await axiosInstance.put(API_PATHS.AUTH.UPDATE_PROFILE, {
                fullName,
                profileImageUrl,
            })

            if (response.data?.user) {
                updateUser(response.data.user)
                toast.success("Profile updated successfully")
                onClose()
            }
        } catch (error) {
            console.error("Error updating profile:", error)
            toast.error(error.response?.data?.message || "Something went wrong")
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <Modal isOpen={isOpen} onClose={onClose} title="Update Profile">
            <div className='space-y-6'>
                <ProfilePhotoSelector 
                    image={profilePic === "REMOVE" ? null : (profilePic || getProfileImageUrl(user?.profileImageUrl))} 
                    setImage={(val) => setProfilePic(val === null ? "REMOVE" : val)} 
                />

                <Input
                    label="Full Name"
                    placeholder="Enter your name"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                />

                <div className='pt-2'>
                    <button
                        type='button'
                        className={`w-full py-3 bg-primary text-white font-bold rounded-2xl shadow-lg shadow-primary/20 hover:bg-primary/90 transition-all ${isLoading ? 'opacity-70 cursor-not-allowed' : ''}`}
                        onClick={handleUpdateProfile}
                        disabled={isLoading}
                    >
                        {isLoading ? "UPDATING..." : "UPDATE PROFILE"}
                    </button>
                </div>
            </div>
        </Modal>
    )
}

export default ProfileModal
