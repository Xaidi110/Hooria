import express from 'express';
import path from 'path';
import dotenv from 'dotenv';
import { GoogleGenAI, Type } from '@google/genai';
import { createServer as createViteServer } from 'vite';
import nodemailer from 'nodemailer';

// Load environment variables
dotenv.config();

const app = express();
const PORT = 3000;

// Initialize Gemini SDK with custom user agent for tracking
const geminiApiKey = process.env.GEMINI_API_KEY || '';
const ai = new GoogleGenAI({
  apiKey: geminiApiKey,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

app.use(express.json());

// Helper function to send actual emails via SMTP if configured, with terminal fallback
async function sendActualEmail({ to, cc, subject, text, html }: { to: string; cc?: string; subject: string; text: string; html: string }) {
  const host = process.env.SMTP_HOST;
  const port = parseInt(process.env.SMTP_PORT || '587', 10);
  const user = process.env.SMTP_USER;
  const pass = process.env.SMTP_PASS;
  const from = process.env.SMTP_FROM || user || 'Hooria Khan Growth Team <growth@hooriakhan.com>';

  const smtpConfigured = !!(host && user && pass);

  if (!smtpConfigured) {
    console.warn('⚠️ SMTP credentials are not configured in environment variables. Falling back to terminal dispatch simulation.');
    console.log(`
==================================================
📧 EMAIL DISPATCH SIMULATION (SMTP Not Configured)
To: ${to}
CC: ${cc || 'None'}
From: ${from}
Subject: ${subject}
Body:
${text}
==================================================
    `);
    return { success: true, smtpConfigured: false };
  }

  try {
    const transporter = nodemailer.createTransport({
      host,
      port,
      secure: port === 465,
      auth: {
        user,
        pass,
      },
    });

    const mailOptions = {
      from,
      to,
      cc,
      subject,
      text,
      html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('✅ Real email sent successfully:', info.messageId);
    return { success: true, smtpConfigured: true, messageId: info.messageId };
  } catch (error) {
    console.error('❌ Error sending real email via SMTP:', error);
    return { success: false, smtpConfigured: true, error: String(error) };
  }
}

// API: Check server health
app.get('/api/health', (req, res) => {
  res.json({ status: 'ok', keyConfigured: !!geminiApiKey });
});

// API: Gemini-Powered Custom Brand & Growth Audit
app.post('/api/audit', async (req, res) => {
  const { businessName, industry, challenge, targetAudience } = req.body;

  if (!businessName || !industry || !challenge) {
    return res.status(400).json({ error: 'Missing required parameters: businessName, industry, challenge' });
  }

  // Dispatch background email notification for the AI Audit request
  const emailText = `New AI Brand & Growth Audit Generated!\n\nBusiness Name: ${businessName}\nIndustry: ${industry}\nChallenge: ${challenge}\nTarget Audience: ${targetAudience || 'Not specified'}`;
  const emailHtml = `
    <div style="font-family: sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #FF4D00; margin-top: 0; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FF4D00; padding-bottom: 8px;">🚀 Brand Audit Request Triggered</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">A visitor has triggered a personalized Brand & Growth Strategy audit using the interactive console.</p>
      
      <div style="background-color: #f8fafc; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #e2e8f0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 140px; color: #475569;">Business Name:</td>
            <td style="padding: 6px 0; color: #0f172a; font-weight: bold;">${businessName}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Industry/Niche:</td>
            <td style="padding: 6px 0; color: #0f172a;">${industry}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Primary Challenge:</td>
            <td style="padding: 6px 0; color: #0f172a;">${challenge}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #475569;">Target Audience:</td>
            <td style="padding: 6px 0; color: #0f172a;">${targetAudience || 'Not specified'}</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 11px; color: #9ca3af; margin-top: 30px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Sent via Hooria Khan Brand & Growth Strategy Application Hub
      </p>
    </div>
  `;

  sendActualEmail({
    to: 'khan.hooria1@gmail.com',
    cc: 'aun.nysofts@gmail.com',
    subject: `⚡ AI Audit Triggered: ${businessName} (${industry})`,
    text: emailText,
    html: emailHtml
  }).catch(err => console.error('Background audit email sending failed:', err));


  // Gracefully handle missing API key to prevent crashes
  if (!process.env.GEMINI_API_KEY) {
    // If key is missing, return a beautiful, realistic, fallback audit mock that represents Hooria's actual methodology!
    const mockAudit = {
      growthScore: 68,
      marketPotential: "High Velocity Pivot Potential (DACH Scale-Up Model)",
      prioritizedInsights: [
        {
          area: "Brand Architecture",
          status: "high",
          recommendation: `Your positioning for ${businessName} currently sounds too generic. Swap standard industry descriptions for a high-contrast USP like "The Compliance Shield" or "Instant Customer Loyalty System" to command a 25% price premium.`
        },
        {
          area: "Digital Funnel Strategy",
          status: "high",
          recommendation: `The challenge: "${challenge}" indicates you are leaking prospects. Implement a zero-friction, interactive audit or diagnostic tool as your primary landing page magnet.`
        },
        {
          area: "Thought Leadership",
          status: "medium",
          recommendation: `Establish authority in ${industry} by having the leadership team publish twice-weekly bold, high-contrast insights on LinkedIn targeting ${targetAudience || 'your target audience'}.`
        }
      ],
      customBlueprint: `### 🚀 Custom Growth Blueprint for **${businessName}**\n\n*Created by Hooria Khan's AI Growth Twin*\n\n---\n\n#### **Phase 1: Brand Position Recalibration (Days 1–15)**\n- Ditch the "safe" text on your homepage. The words you use to describe your service must be completely un-copyable by your nearest competitor.\n- Center your brand on an emotional, business-critical anchor (e.g., peace of mind, extreme speed, undisputed status).\n\n#### **Phase 2: Funnel Optimization (Days 16–45)**\n- Based on your current focus, design a high-contrast landing page specifically for **${targetAudience || 'your primary customer personas'}**.\n- Turn dry feature listings into highly interactive value levers (such as custom savings sliders or live ROAS estimates).\n\n#### **Phase 3: Authority Campaign Launch (Days 46+)**\n- Roll out a LinkedIn content loop centered on addressing the exact friction points your target audience encounters daily. Be direct, opinionated, and highly professional yet charismatic.`
    };
    return res.json(mockAudit);
  }

  try {
    const prompt = `Analyze the following business profile for a custom digital growth and brand positioning audit:
- Business Name: ${businessName}
- Industry/Niche: ${industry}
- Primary Digital Growth Challenge: ${challenge}
- Target Audience: ${targetAudience || 'General B2B/B2C Customers'}

You are Hooria Khan, an ultra-smart, high-energy, and witty brand & growth strategy consultant based in Germany. Your style is colorful, bold, and data-driven (just like emilyroseco.com but with serious growth marketing credentials and DACH market insight). Write a brilliant, direct, no-nonsense audit that provides immediate strategic clarity. 

Highlight:
1. Differentiated Positioning vs generic DACH safety.
2. Conversion Rate Optimization (CRO) tactics.
3. Thought leadership strategy for the executives.

Ensure your tone is engaging, highly competent, slightly cheeky (playful but highly professional), and extremely clear.`;

    const response = await ai.models.generateContent({
      model: 'gemini-3.5-flash',
      contents: prompt,
      config: {
        systemInstruction: "You are Hooria Khan, a top-tier brand strategist and growth marketing consultant who helps businesses scale their digital presence. You specialize in taking companies from safe/dry branding to colorful, bold, high-contrast, and high-conversion assets. Your style is wittily authoritative, highly analytical, and direct. When generating markdown content, use bullet points, bold markers, and numbered lists to make it beautiful.",
        responseMimeType: 'application/json',
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            growthScore: {
              type: Type.INTEGER,
              description: 'A numeric score from 45 to 95 representing their current digital growth readiness.'
            },
            marketPotential: {
              type: Type.STRING,
              description: 'A punchy, creative title for their potential, e.g., "High-Velocity Acceleration Ready" or "High-Dose Positioning Reset Needed".'
            },
            prioritizedInsights: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  area: {
                    type: Type.STRING,
                    description: "Strategic focus area, e.g., 'Brand Messaging Pivot', 'Funnel Friction Reduction', 'Viral LinkedIn Content Loop'."
                  },
                  status: {
                    type: Type.STRING,
                    description: "Must be 'high', 'medium', or 'low' urgency."
                  },
                  recommendation: {
                    type: Type.STRING,
                    description: "An incredibly sharp, customized 1-2 sentence tactical action item."
                  }
                },
                required: ['area', 'status', 'recommendation']
              }
            },
            customBlueprint: {
              type: Type.STRING,
              description: 'A detailed strategic blueprint written in elegant markdown (headers, lists, bold accents, advice) that outlines the next concrete steps to scale their digital presence.'
            }
          },
          required: ['growthScore', 'marketPotential', 'prioritizedInsights', 'customBlueprint']
        }
      }
    });

    const resultText = response.text || '{}';
    const auditResult = JSON.parse(resultText.trim());
    return res.json(auditResult);

  } catch (error) {
    console.error('Error in Gemini API growth audit:', error);
    return res.status(500).json({ error: 'Failed to generate audit. Let\'s try again.' });
  }
});

// API: Contact Inquiry Submission
app.post('/api/contact', async (req, res) => {
  const { name, email, company, serviceNeed, message } = req.body;

  if (!name || !email || !message) {
    return res.status(400).json({ error: 'Missing required parameters: name, email, message' });
  }

  const emailText = `New Strategic Growth Request!\n\nName: ${name}\nEmail: ${email}\nCompany: ${company || 'Not specified'}\nStrategic Need: ${serviceNeed}\nMessage: ${message}`;
  const emailHtml = `
    <div style="font-family: sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #FF4D00; margin-top: 0; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FF4D00; padding-bottom: 8px;">🔥 New Strategic Growth Request</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">A new visitor has submitted a request for strategic consulting from Hooria Khan's Brand & Growth Hub.</p>
      
      <div style="background-color: #f9fafb; border-radius: 8px; padding: 16px; margin: 20px 0; border: 1px solid #f3f4f6;">
        <h3 style="margin: 0 0 12px 0; font-size: 14px; color: #111827; text-transform: uppercase; letter-spacing: 0.05em;">Prospect Details</h3>
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 130px; color: #4b5563;">Name:</td>
            <td style="padding: 6px 0; color: #111827;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Email Address:</td>
            <td style="padding: 6px 0; color: #111827;"><a href="mailto:${email}" style="color: #FF4D00; text-decoration: none; font-weight: 500;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Company:</td>
            <td style="padding: 6px 0; color: #111827;">${company || 'Not specified'}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #4b5563;">Strategic Need:</td>
            <td style="padding: 6px 0; color: #111827;"><span style="background-color: #fff7ed; color: #c2410c; padding: 2px 8px; border-radius: 4px; font-weight: bold; font-size: 12px;">${serviceNeed}</span></td>
          </tr>
        </table>
      </div>

      <h3 style="margin: 0 0 8px 0; font-size: 14px; color: #111827; text-transform: uppercase; letter-spacing: 0.05em;">Message</h3>
      <div style="background-color: #fffdfa; border: 1px dashed #fed7aa; padding: 16px; border-radius: 8px; font-size: 14px; color: #374151; white-space: pre-wrap; line-height: 1.6;">${message}</div>
      
      <p style="font-size: 11px; color: #9ca3af; margin-top: 30px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Sent via Hooria Khan Brand & Growth Strategy Application Hub
      </p>
    </div>
  `;

  const mailResult = await sendActualEmail({
    to: 'khan.hooria1@gmail.com',
    cc: 'aun.nysofts@gmail.com',
    subject: `🔥 New Strategic Request: ${name} (${company || 'N/A'})`,
    text: emailText,
    html: emailHtml
  });

  return res.json({ 
    success: true, 
    message: 'Strategic request received and processed successfully.', 
    smtpConfigured: mailResult.smtpConfigured 
  });
});

// API: Book a Call Submission
app.post('/api/book', async (req, res) => {
  const { name, email, day, time } = req.body;

  if (!name || !email || !day || !time) {
    return res.status(400).json({ error: 'Missing required parameters: name, email, day, time' });
  }

  const emailText = `Confirmed 1:1 Strategy Booking!\n\nAttendee Name: ${name}\nAttendee Email: ${email}\nDate: ${day}\nTime: ${time} (CEST)`;
  const emailHtml = `
    <div style="font-family: sans-serif; padding: 24px; color: #1a1a1a; max-width: 600px; border: 1px solid #e5e7eb; border-radius: 12px; background-color: #ffffff;">
      <h2 style="color: #FF4D00; margin-top: 0; font-size: 20px; font-weight: bold; border-bottom: 2px solid #FF4D00; padding-bottom: 8px;">🚀 Confirmed 1:1 Strategy Call Booking</h2>
      <p style="font-size: 14px; line-height: 1.6; color: #4b5563;">A new strategic consultation session has been secured in the calendar booking simulation system.</p>
      
      <div style="background-color: #f0fdf4; border: 1px solid #bbf7d0; border-radius: 8px; padding: 16px; margin: 20px 0;">
        <table style="width: 100%; border-collapse: collapse; font-size: 14px;">
          <tr>
            <td style="padding: 6px 0; font-weight: bold; width: 130px; color: #166534;">Client Name:</td>
            <td style="padding: 6px 0; color: #14532d; font-weight: bold;">${name}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #166534;">Client Email:</td>
            <td style="padding: 6px 0; color: #14532d;"><a href="mailto:${email}" style="color: #FF4D00; text-decoration: none; font-weight: 500;">${email}</a></td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #166534;">Scheduled Date:</td>
            <td style="padding: 6px 0; color: #14532d; font-weight: bold;">${day}</td>
          </tr>
          <tr>
            <td style="padding: 6px 0; font-weight: bold; color: #166534;">Scheduled Time:</td>
            <td style="padding: 6px 0; color: #14532d; font-weight: bold;">${time} (CEST)</td>
          </tr>
        </table>
      </div>

      <p style="font-size: 11px; color: #9ca3af; margin-top: 30px; text-align: center; border-top: 1px solid #e5e7eb; padding-top: 12px;">
        Sent via Hooria Khan Brand & Growth Strategy Application Hub
      </p>
    </div>
  `;

  const mailResult = await sendActualEmail({
    to: 'khan.hooria1@gmail.com',
    cc: 'aun.nysofts@gmail.com',
    subject: `📅 Confirmed Call Booking: ${name} - ${day} @ ${time}`,
    text: emailText,
    html: emailHtml
  });

  return res.json({ 
    success: true, 
    message: 'Strategy call booked and processed successfully.', 
    smtpConfigured: mailResult.smtpConfigured 
  });
});

// Serve assets and handle Vite in Development, static serving in Production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), 'dist');
    app.use(express.static(distPath));
    app.get('*', (req, res) => {
      res.sendFile(path.join(distPath, 'index.html'));
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Express custom server running on http://localhost:${PORT} [NODE_ENV=${process.env.NODE_ENV || 'development'}]`);
  });
}

startServer();
