'use client';
import styles from "../styles/table.module.css";
import Image from "next/image";

async function getFaculty() {
    const postData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        next: { revalidate: 0 }
    };

    const res = await fetch('http://localhost:3000/api/faculty', postData);

    if (!res.ok) {
        throw new Error("Cannot fetch");
    }

    return res.json();
}

async function getRounds() {
    const postData = {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        },
        next: { revalidate: 0 }
    };

    const res = await fetch('http://localhost:3000/api/round', postData);

    if (!res.ok) {
        throw new Error("Cannot fetch");
    }

    return res.json();
}

export default async function TableFaculty() {
    const faculty = await getFaculty();
    const rounds = await getRounds();

    return (
        <table className={styles.box}>
            <thead>
                <tr>
                    <th className={styles.head}></th>
                    <th className={styles.head}>จำนวน</th>
                    <th className={styles.head}>รอบ</th>
                    <th className={styles.head}></th>
                </tr>
            </thead>
            <tbody className={styles.agency}>
                {faculty.faculty.map((facultyItem, index) => (
                    <tr key={index}>
                        <td>{facultyItem.name}</td>
                        <td>{facultyItem.total}</td>
                        <td>{facultyItem.idround}</td>
                     
                        <td><button>ลบ</button></td>
                    </tr>
                ))}
            </tbody>
        </table>
    );
}
   {/* <td>
                            {rounds.round.map((round, index) => (
                                <div key={index}>{round.name}</div>
                            ))}
                        </td> */}
