// ------------------- background.js -------------------
// Bestandsnaam: background.js
// Dit script zoekt de Zorgmail-identity en verstuurt de e-mail.

async function getZorgmailIdentity() {
  let accounts = await messenger.accounts.list();
  let candidates = [];

  // Zoek identities met e-mail eindigend op @zorgmail.nl
  for (let account of accounts) {
    for (let identity of account.identities) {
      const emailAddr = (identity.email || identity.emailAddress || "").toLowerCase();
      if (emailAddr.endsWith("@zorgmail.nl")) {
        candidates.push(identity);
      }
    }
  }

  // Exact één match
  if (candidates.length === 1) {
    console.log("Één Zorgmail-identity gevonden:", candidates[0]);
    return candidates[0];
  }

  // Meerdere matches: filter op smtpServerKey
  if (candidates.length > 1) {
    console.log(candidates.length + " Zorgmail-identities gevonden, filteren op SMTP-serverKey...");
    for (let identity of candidates) {
      if (identity.smtpServerKey && identity.smtpServerKey.toLowerCase().includes("zorgmail")) {
        console.log("Geselecteerde identity op basis van SMTP-serverKey:", identity);
        return identity;
      }
    }
    console.log("Geen SMTP-specifieke identity gevonden, gebruik de eerste candidate:", candidates[0]);
    return candidates[0];
  }

  // Fallback: zoek op accountnaam
  for (let account of accounts) {
    if (account.name && account.name.toLowerCase().includes("zorgmail")) {
      console.log("Geen identity op e-mail gevonden, gebruik default identity van account:", account.name);
      let defaultId = account.identities.find(id => id.isDefault) || account.identities[0];
      return defaultId;
    }
  }

  // Niets gevonden
  return null;
}

messenger.composeAction.onClicked.addListener(async (tab) => {
  let identity = await getZorgmailIdentity();
  if (!identity) {
    messenger.composeAction.setBadgeText({ text: "!" });
    messenger.composeAction.setTitle({ title: "Zorgmail-identiteit niet gevonden" });
    console.error("Veilig Verzenden fout: geen Zorgmail-identity gevonden.");
    return;
  }

  try {
    // Stel de gevonden Zorgmail-identity in
    await messenger.compose.setComposeDetails(tab.id, { identityId: identity.id });
    console.log("Zorgmail-identity ingesteld:", identity);

    // Verstuur de mail direct
    await messenger.compose.sendMessage(tab.id, { mode: "sendNow" });
    console.log("E-mail succesvol verzonden via Zorgmail-identity.");
  } catch (err) {
    console.error("Fout bij instellen identity of verzenden:", err);
  }
});