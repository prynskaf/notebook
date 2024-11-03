Here’s the `README.md` content formatted in Markdown syntax:

```markdown
# Code Notebook

Welcome to **Code Notebook**! This application helps users manage their coding notes and snippets in an organized way. 

[Visit the live site](https://notebook-two-zeta.vercel.app/)

## Table of Contents

- [Features](#features)
- [Installation](#installation)
- [Usage](#usage)
- [Tech Stack](#tech-stack)
- [Contributing](#contributing)
- [License](#license)

## Features

- **Note Creation**: Add, edit, and delete notes.
- **Rich Text Editing**: Utilize rich text formatting using TinyMCE for titles and content.
- **Code Highlighting**: Add code snippets with language support for JavaScript, TypeScript, CSS, HTML, and more.
- **Pagination**: Navigate through multiple pages of notes.
- **Delete Confirmation Modal**: Prevent accidental deletions with a confirmation modal.
- **Authentication**: Only authenticated users can create, edit, or delete notes.

## Installation

To run the project locally, follow these steps:

1. **Clone the repository:**
   ```bash
   git clone <your-repository-url>
   cd code-notebook
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env.local` file at the root of your project and add the following:

   ```bash
   NEXT_PUBLIC_TINYMCE_API_KEY=<Your TinyMCE API Key>
   ```

4. **Run the development server:**
   ```bash
   npm run dev
   ```

5. **Visit the app**: Open [http://localhost:3000](http://localhost:3000) in your browser.

## Usage

1. **Sign Up / Sign In**: Only authenticated users can create and manage notes.
2. **Create a New Note**: Click the "Create Note" button to add a new note.
3. **Edit / View Notes**: Browse through existing notes, edit or delete them as needed.
4. **Delete Confirmation**: When deleting a note, a modal will ask for confirmation to avoid accidental deletions.

## Tech Stack

- **Frontend**: React, Next.js, TypeScript
- **Editor**: TinyMCE for rich text editing, Monaco Editor for code snippets
- **State Management**: Zustand
- **Styling**: CSS Modules
- **Authentication**: Clerk
- **Notifications**: Sonner for toast notifications

## Contributing

We welcome contributions! To contribute:

1. Fork the project.
2. Create your feature branch (`git checkout -b feature/YourFeature`).
3. Commit your changes (`git commit -m 'Add YourFeature'`).
4. Push to the branch (`git push origin feature/YourFeature`).
5. Open a Pull Request.

## License
