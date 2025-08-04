import { NextResponse } from 'next/server';
import { Resend } from 'resend';

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { email, subject, message } = body;

    if (!email || !subject || !message) {
      return NextResponse.json({ error: 'Champs requis manquants.' }, { status: 400 });
    }

    const data = await resend.emails.send({
      from: 'Gloirelle Ngayo <onboarding@resend.dev>',
      to: ['gloirengayo@gmail.com'], 
      subject: `Formulaire Contact: ${subject}`,
      html: `
        <div>
          <p><strong>Email :</strong> ${email}</p>
          <p><strong>Sujet :</strong> ${subject}</p>
          <p><strong>Message :</strong><br/>${message}</p>
        </div>
      `,
    });

    return NextResponse.json({ success: true, data });
  } catch (error) {
    console.error('Erreur lors de l’envoi d’email :', error);
    return NextResponse.json({ error: 'Erreur lors de l’envoi du message.' }, { status: 500 });
  }
}
