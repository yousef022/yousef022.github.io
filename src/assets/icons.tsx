export const Icon = ({ children, viewBox = "0 0 24 24" }: { children: React.ReactNode; viewBox?: string }) => (
  <svg
    viewBox={viewBox}
    width="18"
    height="18"
    aria-hidden="true"
    focusable="false"
    style={{ display: "block" }}
  >
    {children}
  </svg>
);

export const GithubIcon = () => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.009-.868-.014-1.703-2.782.605-3.369-1.343-3.369-1.343-.455-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.071 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.094.39-1.988 1.029-2.688-.103-.253-.446-1.27.098-2.646 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0 1 12 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.026 2.747-1.026.546 1.376.203 2.393.1 2.646.64.7 1.028 1.594 1.028 2.688 0 3.848-2.338 4.695-4.566 4.943.359.31.679.92.679 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.02 10.02 0 0 0 22 12.017C22 6.484 17.523 2 12 2Z"
    />
  </Icon>
);

export const LinkedInIcon = () => (
  <Icon viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M4.98 3.5C4.98 4.88 3.87 6 2.5 6S0 4.88 0 3.5 1.12 1 2.5 1 4.98 2.12 4.98 3.5ZM.5 23.5h4V7.98h-4V23.5ZM8.5 7.98h3.83v2.12h.05c.53-1.01 1.83-2.12 3.77-2.12 4.03 0 4.77 2.65 4.77 6.09v9.43h-4v-8.36c0-2-.04-4.57-2.79-4.57-2.79 0-3.22 2.18-3.22 4.43v8.5h-4V7.98Z"
    />
  </Icon>
);

export const MailIcon = () => (
  <Icon viewBox="0 0 24 24">
    <path d="M4 6h16v12H4V6Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
    <path d="m4 7 8 6 8-6" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </Icon>
);

export const BriefcaseIcon = () => (
  <Icon>
    <path
      d="M9 6V5a2 2 0 0 1 2-2h2a2 2 0 0 1 2 2v1"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path d="M4 7h16v12H4V7Z" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </Icon>
);

export const UsersIcon = () => (
  <Icon>
    <path d="M16 11a3 3 0 1 0-2.999-3A3 3 0 0 0 16 11Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path d="M8 11a3 3 0 1 0-3-3 3 3 0 0 0 3 3Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
    <path
      d="M3 20a5 5 0 0 1 10 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
    <path
      d="M13 20a5 5 0 0 1 8 0"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinecap="round"
    />
  </Icon>
);

export const LayersIcon = () => (
  <Icon>
    <path
      d="M12 3 3 8l9 5 9-5-9-5Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M3 12l9 5 9-5" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinejoin="round" />
  </Icon>
);

export const PinIcon = () => (
  <Icon>
    <path
      d="M12 21s6-4.35 6-10a6 6 0 0 0-12 0c0 5.65 6 10 6 10Z"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
      strokeLinejoin="round"
    />
    <path d="M12 11a2 2 0 1 0-2-2 2 2 0 0 0 2 2Z" fill="none" stroke="currentColor" strokeWidth="1.8" />
  </Icon>
);
