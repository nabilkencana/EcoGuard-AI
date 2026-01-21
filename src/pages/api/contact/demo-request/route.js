import nodemailer from 'nodemailer';
import { NextResponse } from "next/server";

export default async function handler(req, res) {
    // Set response header sebagai JSON
    res.setHeader('Content-Type', 'application/json');

    // Hanya terima POST request
    if (req.method !== 'POST') {
        return res.status(405).json({
            success: false,
            message: 'Method not allowed. Use POST.'
        });
    }

    console.log('Demo request received:', req.body);

    try {
        const { name, email, phone, company, industry, facilitySize, interest, message } = req.body;

        // Validasi sederhana
        if (!name || !email || !phone || !company) {
            return res.status(400).json({
                success: false,
                message: 'Harap isi semua field wajib: Nama, Email, Telepon, dan Perusahaan'
            });
        }

        // Untuk testing, gunakan console log saja dulu
        console.log('📧 Email yang akan dikirim:');
        console.log('To:', email);
        console.log('Name:', name);
        console.log('Company:', company);
        console.log('Phone:', phone);

        // Simulasi sukses tanpa benar-benar mengirim email dulu
        const timestamp = new Date().toLocaleString('id-ID', {
            timeZone: 'Asia/Jakarta',
            dateStyle: 'full',
            timeStyle: 'long'
        });

        // Return success response (tanpa email dulu)
        return res.status(200).json({
            success: true,
            message: '🎉 Permintaan demo berhasil dikirim! Tim kami akan menghubungi Anda dalam 24 jam.',
            data: {
                name,
                company,
                email,
                phone,
                industry,
                facilitySize,
                interest,
                message,
                timestamp
            },
            note: 'Email functionality disabled for testing'
        });

    } catch (error) {
        console.error('Error in API route:', error);

        // Return error response tetap dalam format JSON
        return res.status(500).json({
            success: false,
            message: 'Terjadi kesalahan saat mengirim permintaan.',
            error: process.env.NODE_ENV === 'development' ? error.message : undefined,
            timestamp: new Date().toISOString()
        });
    }
}

export async function POST(request) {
    const body = await request.json();

    return NextResponse.json({
        success: true,
        message: "Demo request berhasil",
        data: body
    });
}