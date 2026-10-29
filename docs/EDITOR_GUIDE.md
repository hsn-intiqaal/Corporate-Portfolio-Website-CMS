# Editor Guide

Sign in at **`https://<your-domain>/admin`** with the email and password of your account. The first account created
on a new site becomes the Administrator; administrators add the other users (Administration → Users). Forgotten
passwords can be reset from the login page once email (SMTP) is configured.

The dashboard is fully available in **Arabic and English**: open your account (top corner) → _Language_.

## Languages: the most important habit

Every page, service and project has an **Arabic** and an **English** version. The **Locale** switch at
the top of each edit screen chooses which language you are typing in.

- Layout (which sections, their order, images and settings) is shared by both languages.
- Text is entered separately for each language: switch the locale, then fill in the same fields.
- If one language is missing, the site follows the rule in _Branding & settings → Languages_: it either
  shows the other language with a notice, or hides the page until the translation is ready.
- Images that contain text can have a separate Arabic version (Hero and Text-and-image sections).

## Design: colours, fonts and shapes

Administration → Branding & settings → **Design**:

- **Colours**: pick a ready-made palette, or choose _Custom colours_ and set each colour with the colour picker.
  Colours that would make text unreadable are rejected with an explanation (contrast check).
- **Fonts**: Arabic and English fonts for body text and headings, text size and heading weight.
- **Shapes**: corner style of cards and images, button shape.
- **Header**: light, primary-colour or dark header; sticky header; show/hide search, language switcher and WhatsApp button.
- **Custom CSS** (advanced): small adjustments by someone who knows CSS.

## Site texts

**Site texts** (dashboard menu) holds every fixed text on the website: buttons, form labels and messages, blog and
newsletter wording, 404 page. Switch the locale at the top to edit Arabic or English. A field left empty uses the
default text shown as its label. Keep `{placeholders}` such as `{n}` when editing.

## Common tasks

| Task                               | Where                                                                                                                                                                                                                 |
| ---------------------------------- | --------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Edit the homepage                  | Pages → **Home**                                                                                                                                                                                                      |
| Add a service                      | Services → **Create new**; drag rows in the list to set the display order                                                                                                                                             |
| Add a project                      | Projects → **Create new**; set categories, location and completion date in the sidebar                                                                                                                                |
| Upload images                      | Media → **Create new**. **Alt text is required** (describe the image for screen readers and Google)                                                                                                                   |
| Change menus                       | Navigation → Header menu / Footer                                                                                                                                                                                     |
| Change phone, email, logo, colours | Administration → Branding & settings (administrators)                                                                                                                                                                 |
| Write an article                   | Articles → **Create new**: title, summary, cover image, content (use _Heading 2/3_ so the table of contents is built automatically), category, author and tags in the sidebar. Publishing sets the date automatically |
| Add a brochure / company profile   | Downloadable documents → upload the PDF, then add a **Download brochure** section to any page                                                                                                                         |
| Newsletter list                    | Leads → Newsletter subscribers (administrators) → **Export confirmed subscribers (CSV)** and import it into your email tool                                                                                           |
| Live chat, tag manager, pixels     | Branding & settings → Integrations → Third-party scripts (administrators)                                                                                                                                             |
| Connect a CRM                      | Branding & settings → Integrations → webhook URL and secret (administrators)                                                                                                                                          |
| Handle enquiries                   | Leads (administrators): set the status to _In progress_ or _Closed_ and add notes. Use **Export CSV** for Excel                                                                                                       |

## Building a page from sections

Open a page → **Content** tab → **Add Layout** and choose a section:
Hero banner · Text and image · Service cards · Project gallery · Project highlight · Statistics ·
Testimonials · Partner logos · FAQ · Call to action · Contact section · Rich text · Latest articles · Team ·
Process steps · Video · Newsletter signup · Download brochure.

- Use the **⋮** menu on a section to duplicate, move or remove it, or drag it by its handle.
- **Section settings** on every section: _Hide this section_ (keeps it without showing it), background colour, spacing.
- Statistics must use verified figures only.
- Making a new kind of section (new layout or fields) is a developer change request.

## Drafts, preview, publishing and history

- Changes save automatically as a **draft**; the live site does not change until you **Publish**.
- **Preview** (the eye icon) opens the draft on the real site with a yellow "draft preview" bar.
- **Versions** shows every saved version; open one and choose **Restore** to roll back.
- Publishing can be scheduled for a future date from the arrow next to the _Publish_ button.
- Editors can publish only if an administrator enabled _Editors can publish_ in Branding & settings → Leads & roles;
  otherwise editors save drafts and an administrator publishes.

## SEO tab

The dashboard home shows an **SEO health** list of published items missing an SEO title or description in either language. Work through it until it is empty.

Each page, service, project and article has an **SEO** tab per language: title (about 50–60 characters),
description (about 100–150 characters) and social sharing image. _Auto-generate_ fills them from the content.
Changing a published page's **slug** (URL) automatically creates a redirect from the old address.

## Roles

|                                   | Administrator | Editor          |
| --------------------------------- | ------------- | --------------- |
| Create and edit content           | ✓             | ✓               |
| Publish                           | ✓             | Only if enabled |
| Delete                            | ✓             | –               |
| Leads, users, settings, audit log | ✓             | –               |
