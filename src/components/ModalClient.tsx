"use client";

import { closeModal, switchToSignIn, switchToSignUp } from '@/Script';
import axios from 'axios';
import React, { useState } from 'react';
import { getAuth } from "firebase/auth"; // 🔥 ADD THIS

type ClientTaskData = {
    companyName: string,
    companyMobileNumber: string,
    companyEmail: string,
    orgType: string,
    clientWebsite: string,
};

const ModalClient = () => {

    const [ClientTaskData, setClientTaskData] = useState<ClientTaskData>({
        companyName: '',
        companyMobileNumber: '',
        companyEmail: '',
        orgType: '',
        clientWebsite: '',
    });

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setClientTaskData((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // 🔥 FINAL FIXED FUNCTION
    const RagisterClient = async () => {
        try {
            const auth = getAuth();

            if (!auth.currentUser) {
                alert("❌ Please login first");
                return;
            }

            // 🔥 GET FIREBASE JWT
            const token = await auth.currentUser.getIdToken();

            console.log("🔥 TOKEN:", token);

            const response = await axios.post(
                `${process.env.NEXT_PUBLIC_API_URL}/api/client/apply`,
                ClientTaskData,
                {
                    headers: {
                        Authorization: `Bearer ${token}`, // 🔥 FIXED
                        "Content-Type": "application/json",
                    },
                    withCredentials: true,
                }
            );

            console.log("✅ API RESPONSE:", response.data);
            alert("Client Data Submited Successfully!");

            setClientTaskData({
                companyName: '',
                companyMobileNumber: '',
                companyEmail: '',
                orgType: '',
                clientWebsite: '',
            });
            closeModal();
        } catch (error) {
            // console.error("❌ Client Registration Error:", );
            alert("Client already exist.");
        }
        
    };

    return (
        <>
            <div className="modal-mask" id="modalMask">
                <div className="modal-box">
                    <button className="m-close" onClick={closeModal}>
                        <i className="fas fa-times"></i>
                    </button>

                    <h2>Welcome Back</h2>
                    <p>Sign in to your dashboard or create a new account.</p>

                    <div className="m-tabs">
                        <button id='tSI' className="m-tab on" onClick={switchToSignIn}>Sign In</button>
                        <button id='tSU' className="m-tab" onClick={switchToSignUp}>Contact</button>
                    </div>

                    <div className="m-form" id='fSI'>
                        <input name="companyName" placeholder="Company Name" value={ClientTaskData.companyName} onChange={handleInputChange} />
                        <input name="companyMobileNumber" placeholder="Mobile Number" value={ClientTaskData.companyMobileNumber} onChange={handleInputChange} />
                        <input name="companyEmail" placeholder="Email Address" value={ClientTaskData.companyEmail} onChange={handleInputChange} />
                        <input name="orgType" placeholder="Organization Type" value={ClientTaskData.orgType} onChange={handleInputChange} />
                        <input name="clientWebsite" placeholder="Client Website" value={ClientTaskData.clientWebsite} onChange={handleInputChange} />

                        <button className="btn-msub" onClick={RagisterClient}>
                            Submit →
                        </button>
                    </div>
                    <div className="m-form" id='fSU'>

                    </div>
                    {/* <div className="m-form">
                        <input
                            name="marks10"
                            placeholder="Enter 10th Marks"
                            value={signUpData.marks10}
                            onChange={handleInputChange}
                        />

                        <input
                            name="marks12"
                            placeholder="Enter 12th Marks"
                            value={signUpData.marks12}
                            onChange={handleInputChange}
                        />

                        <input
                            name="graduationMarks"
                            placeholder="Enter Graduation Marks"
                            value={signUpData.graduationMarks}
                            onChange={handleInputChange}
                        />

                        <input
                            name="stream"
                            placeholder="Enter Your Stream"
                            value={signUpData.stream}
                            onChange={handleInputChange}
                        />

                        <input
                            name="experience"
                            placeholder="Enter Experience (e.g. 3 years)"
                            value={signUpData.experience}
                            onChange={handleInputChange}
                        />

                        <input
                            name="skill"
                            placeholder="Enter Skills (Java, Spring Boot, React)"
                            value={signUpData.skill}
                            onChange={handleInputChange}
                        />

                        <input
                            name="skillType"
                            placeholder="Enter Skill Type"
                            value={signUpData.skillType}
                            onChange={handleInputChange}
                        />

                        <input
                            type="file"
                            name="resume"
                            accept=".pdf,.doc,.docx"
                            onChange={handleFileChange}
                        />

                        <button className="btn-msub" onClick={RagisterClient}>
                            Submit →
                        </button>
                    </div> */}
                </div>
            </div>
        </>
    );
};

export default ModalClient;