type EnquiryFields = Record<string, string>;

type Web3FormsResponse = {
  message?: string;
  success?: boolean;
};

export async function submitEnquiry(subject: string, fields: EnquiryFields) {
  const accessKey = process.env.NEXT_PUBLIC_WEB3FORMS_KEY;

  if (!accessKey) {
    throw new Error(
      "This enquiry form is not configured yet. Please contact us by WhatsApp or email."
    );
  }

  const response = await fetch("https://api.web3forms.com/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify({ access_key: accessKey, subject, ...fields }),
  });

  let result: Web3FormsResponse | undefined;
  try {
    result = (await response.json()) as Web3FormsResponse;
  } catch {
    // A non-JSON response is still handled by the status check below.
  }

  if (!response.ok || result?.success !== true) {
    throw new Error(result?.message || "We could not send your request. Please try again.");
  }
}
