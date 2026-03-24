import { NextResponse } from 'next/server';
import { createClient } from "@libsql/client";

export async function GET() {
    try {
        const turso = createClient({
            url: process.env.TURSO_DATABASE_URL as string,
            authToken: process.env.TURSO_AUTH_TOKEN as string,
        });

        // Tarik data, urutkan dari yang terbaru
        const result = await turso.execute("SELECT * FROM ledger ORDER BY id DESC");
        
        return NextResponse.json(result.rows);
    } catch (error) {
        console.error(error);
        return NextResponse.json({ error: "Gagal menarik data dari Turso" }, { status: 500 });
    }
}
