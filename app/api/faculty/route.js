import { NextResponse } from "next/server";
import pool from "@/app/lib/mysql";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*', // หรือระบุ origin ที่อนุญาตเช่น 'https://your-vercel-app.vercel.app'
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
  'Access-Control-Allow-Headers': 'Content-Type',
};

export async function GET(request) {
    try {
        const connection = await pool.getConnection();
        const query = `
            SELECT faculty.idfaculty, faculty.name, faculty.total, round.name AS rname
            FROM faculty
            JOIN round ON round.idround = faculty.idround
        `;
        const [rows] = await connection.execute(query);
        connection.release();
        return NextResponse.json({ faculty: rows }, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ error }, { status: 500, headers: corsHeaders });
    }
}

export async function DELETE(request) {
    try {
        const { idfaculty } = await request.json();
        if (!idfaculty) {
            return NextResponse.json({ error: "ID is required" }, { status: 400, headers: corsHeaders });
        }

        const connection = await pool.getConnection();
        const query = 'DELETE FROM faculty WHERE idfaculty = ?';
        const [result] = await connection.execute(query, [idfaculty]);
        connection.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "No faculty member found with the given ID" }, { status: 404, headers: corsHeaders });
        }

        return NextResponse.json({ message: "Faculty member deleted successfully" }, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }
}

export async function PUT(request) {
    try {
        const body = await request.json();
        const { id, name, total, rname } = body;

        if (!id || !name || !total || !rname) {
            return NextResponse.json({ error: "ID, name, total, and rname are required" }, { status: 400, headers: corsHeaders });
        }

        const connection = await pool.getConnection();
        const selectRoundQuery = 'SELECT idround FROM round WHERE name = ? LIMIT 1';
        const [roundResult] = await connection.execute(selectRoundQuery, [rname]);

        if (roundResult.length === 0) {
            return NextResponse.json({ error: "No round found with the given name" }, { status: 404, headers: corsHeaders });
        }

        const idround = roundResult[0].idround;
        const updateFacultyQuery = 'UPDATE faculty SET name = ?, total = ?, idround = ? WHERE idfaculty = ?';
        const [result] = await connection.execute(updateFacultyQuery, [name, total, idround, id]);
        connection.release();

        if (result.affectedRows === 0) {
            return NextResponse.json({ error: "No faculty member found with the given ID" }, { status: 404, headers: corsHeaders });
        }

        return NextResponse.json({ message: "Faculty updated successfully" }, { headers: corsHeaders });
    } catch (error) {
        return NextResponse.json({ error: error.message }, { status: 500, headers: corsHeaders });
    }
}
