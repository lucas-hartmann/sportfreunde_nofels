import { NextResponse } from "next/server";
import nodemailer from "nodemailer";

export async function POST(req: Request) {
  const data = await req.json();

  // Transporter für Hetzner
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: Number(process.env.EMAIL_PORT),
    secure: false, // false für Port 587 (TLS), true nur für 465 (SSL)
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
    tls: {
      rejectUnauthorized: false, // nötig bei manchen Hetzner-SSL-Konfigs
    },
  });

  try {
    await transporter.sendMail({
      from: `"Team Anmeldung" <${process.env.EMAIL_USER}>`,
      to: process.env.EMAIL_USER, // Mail an dich selbst
      subject: "Neue Team-Anmeldung",
      text: `
        Name: ${data.name}
        Email: ${data.email}
        Telefon: ${data.phone}
        Teamname: ${data.teamName}
        Nachricht: ${data.message}
      `,
    });

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Mail Fehler:", error);
    return NextResponse.json({ success: false }, { status: 500 });
  }
}
