# Editor Guide

Sign in at **`https://<your-domain>/admin`**. The dashboard can be shown in Arabic or English: open your
account (top right) and choose the language.

## Languages: the most important habit
Every page, service and project has an **Arabic** and an **English** version. The **Locale** switch at
the top of each edit screen chooses which language you are typing in.
- Layout (which sections, their order, images and settings) is shared by both languages.
- Text is entered separately for each language: switch the locale, then fill in the same fields.
- If one language is missing, the site follows the rule in *Branding & settings → Languages*: it either
  shows the other language with a notice, or hides the page until the translation is ready.
- Images that contain text can have a separate Arabic version (Hero and Text-and-image sections).

## Common tasks
| Task | Where |
|---|---|
| Edit the homepage | Pages → **Home** |
| Add a service | Services → **Create new**; drag rows in the list to set the display order |
| Add a project | Projects → **Create new**; set categories, location and completion date in the sidebar |
| Upload images | Media → **Create new**. **Alt text is required** (describe the image for screen readers and Google) |
| Change menus | Navigation → Header menu / Footer |
| Change phone, email, logo, colours | Administration → Branding & settings (administrators) |
| Handle enquiries | Leads (administrators): set the status to *In progress* or *Closed* and add notes. Use **Export CSV** for Excel |

## Building a page from sections
Open a page → **Content** tab → **Add Layout** and choose a section:
Hero banner · Text and image · Service cards · Project gallery · Project highlight · Statistics ·
Testimonials · Partner logos · FAQ · Call to action · Contact section · Rich text.
- Use the **⋮** menu on a section to duplicate, move or remove it, or drag it by its handle.
- **Section settings** on every section: *Hide this section* (keeps it without showing it), background colour, spacing.
- Statistics must use verified figures only.
- Making a new kind of section (new layout or fields) is a developer change request.

## Drafts, preview, publishing and history
- Changes save automatically as a **draft**; the live site does not change until you **Publish**.
- **Preview** (the eye icon) opens the draft on the real site with a yellow "draft preview" bar.
- **Versions** shows every saved version; open one and choose **Restore** to roll back.
- Publishing can be scheduled for a future date from the arrow next to the *Publish* button.
- Editors can publish only if an administrator enabled *Editors can publish* in Branding & settings → Leads & roles;
  otherwise editors save drafts and an administrator publishes.

## SEO tab
Each page, service and project has an **SEO** tab per language: title (about 50–60 characters),
description (about 100–150 characters) and social sharing image. *Auto-generate* fills them from the content.
Changing a published page's **slug** (URL) automatically creates a redirect from the old address.

## Roles
| | Administrator | Editor |
|---|---|---|
| Create and edit content | ✓ | ✓ |
| Publish | ✓ | Only if enabled |
| Delete | ✓ | – |
| Leads, users, settings, audit log | ✓ | – |
