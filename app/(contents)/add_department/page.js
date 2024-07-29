"use client";

import { useState, useEffect } from 'react';
import Navbar from "@/app/components/navbar";
import Footer from "@/app/components/footer";
import postData from "@/app/components/CLUD/post";
import Handle_Click from "@/app/components/handle/handleclick";
import { useRouter } from 'next/navigation';
import { useSession, signIn } from 'next-auth/react';
import styles from '@/app/styles/add_department.module.css';

export default function AddDepartment() {
    const { data: session, status } = useSession();
    const [name, setName] = useState('');
    const [total, setTotal] = useState('');
    const [rname, setRname] = useState('');
    const roundOptions = ["เช้า ช่วง 1", "เช้า ช่วง 2", "บ่าย ช่วง 1", "บ่าย ช่วง 2"];
    
    const router = useRouter();

    useEffect(() => {
        if (status === 'loading') return;

        if (!session) {
            signIn();
        }
    }, [session, status]);

    const handleSubmit = async () => {
        const departmentData = { name, total, rname };
        console.log('Department data:', departmentData);
    
        try {
            const result = await postData('add_department', departmentData);
            console.log('Department added successfully:', result);
            setName('');
            setTotal('');
            setRname('');
            router.push("/faculty");
        } catch (error) {
            console.error('Error adding department:', error);
        }
    };

    if (status === 'loading') {
        return <div>Loading...</div>;
    }

    if (!session) {
        return null;
    }

    return (
        <div>
            <Navbar />
            <div className={styles.BodyContainer}>
                <h1>เพิ่มหน่วยงาน</h1>
                <form onSubmit={(e) => { e.preventDefault(); handleSubmit(); }} className={styles.containerForm}>
                    <div className={styles.nameFaculty}>
                        <label>
                            หน่วยงาน :
                        </label>
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.numberStyle}>
                        <label>
                            จำนวนเข้ารับ :
                        </label>
                        <input
                            type="number"
                            value={total}
                            onChange={(e) => setTotal(e.target.value)}
                            required
                        />
                    </div>
                    <div className={styles.roundStyle}>
                        <label>
                            รอบ : 
                        </label>
                        <select value={rname} onChange={(e) => setRname(e.target.value)} required>
                            <option value="">เลือกรอบ</option>
                            {roundOptions.map((option, i) => (
                                <option key={i} value={option}>{option}</option>
                            ))}
                        </select>
                    </div>
                </form>

                <div className={styles.buttonContainer}>
                    <Handle_Click className={styles.buttonBack} path="/faculty" buttonText="ย้อนกลับ" /> 
                    <button type="button" className={styles.buttonSave} onClick={handleSubmit}>บันทึก</button>
                </div>
               
            </div>
            <Footer />
        </div>
    );
}
