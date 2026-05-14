/**
 * HubSpot upsert helper — find-or-create contact by email, then patch properties.
 * Prevents duplicate contacts on repeat form submissions.
 */

const HS_BASE = "https://api.hubapi.com";

export async function upsertHubSpotContact(
  token: string,
  properties: Record<string, string>
): Promise<void> {
  const email = properties.email;
  if (!email) return;

  // 1. Search for existing contact by email
  const searchRes = await fetch(`${HS_BASE}/crm/v3/objects/contacts/search`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({
      filterGroups: [
        {
          filters: [
            { propertyName: "email", operator: "EQ", value: email },
          ],
        },
      ],
      properties: ["email"],
      limit: 1,
    }),
  });

  if (!searchRes.ok) {
    // Fall back to create if search fails
    await createContact(token, properties);
    return;
  }

  const searchData = await searchRes.json();
  const existingId: string | null = searchData.results?.[0]?.id ?? null;

  if (existingId) {
    // 2a. Contact exists — patch with latest properties
    await fetch(`${HS_BASE}/crm/v3/objects/contacts/${existingId}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ properties }),
    });
  } else {
    // 2b. No existing contact — create new
    await createContact(token, properties);
  }
}

async function createContact(
  token: string,
  properties: Record<string, string>
): Promise<void> {
  await fetch(`${HS_BASE}/crm/v3/objects/contacts`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify({ properties }),
  });
}
