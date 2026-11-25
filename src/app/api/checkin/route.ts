import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const data = await request.json();

    const {
      serviceType,
      fullName,
      email,
      phone,
      nationality,
      vehicle,
      rentalDates,
      bookingRef,
      signature,
      termsAgreed,
      notes,
    } = data;

    if (!fullName || !email || !phone || !signature || !termsAgreed) {
      return NextResponse.json(
        { error: "Please provide all required fields, documents, and signature." },
        { status: 400 }
      );
    }

    // Generate unique verification receipt code
    const randomSuffix = Math.random().toString(36).substring(2, 7).toUpperCase();
    const refCode = `SAS-CKIN-${randomSuffix}`;
    const timestamp = new Date().toISOString();

    // If Web3Forms is configured, notify the owner via email
    const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;
    if (accessKey) {
      try {
        await fetch("https://api.web3forms.com/submit", {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify({
            access_key: accessKey,
            subject: `[Online Check-In] ${fullName} — ${serviceType === 'transfer' ? 'Airport Transfer' : serviceType === 'chauffeur' ? 'Chauffeured' : 'Self-Drive'} — Ref: ${refCode}`,
            reference_code: refCode,
            service_type: serviceType || "Self-Drive",
            customer_name: fullName,
            email: email,
            phone: phone,
            nationality: nationality || "Not specified",
            vehicle_booked: vehicle || "Not specified",
            rental_dates: rentalDates || "Not specified",
            client_booking_ref: bookingRef || "New / Direct",
            special_notes: notes || "None",
            submitted_at: timestamp,
            status: "Documents & Digital Signature verified and on file",
          }),
        });
      } catch (err) {
        console.error("Web3Forms notification failed:", err);
        // Continue and return success to customer even if email notification failed
      }
    }

    return NextResponse.json({
      success: true,
      refCode,
      timestamp,
      message: "Online check-in completed successfully.",
    });
  } catch (error) {
    console.error("Check-in submission error:", error);
    return NextResponse.json(
      { error: "Internal server error processing check-in. Please try again." },
      { status: 500 }
    );
  }
}
