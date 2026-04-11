# Asset Upload Folders

Place your files in these folders:

- profile image: public/assets/profile/
- resume PDF: public/assets/resume/
- screenshots (ss): public/assets/screenshots/

Examples:

- /assets/profile/my-photo.jpg
- /assets/resume/Prince_Kumar_Resume.pdf
- /assets/screenshots/ctf-dashboard.png

Then reference these paths in frontend data files:

- src/data/profile.ts -> profileImageUrl
- src/data/blog.ts -> thumbnailUrl (if needed)
