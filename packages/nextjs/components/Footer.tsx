import Link from "next/link";
import { COMPANY_DESCRIPTION, COMPANY_LINK, COMPANY_NAME } from "../../../configuration/company";

const navigation = [
  {
    name: "Documentation",
    href: "#",
  },
  {
    name: "Terms and Conditions",
    href: "#",
  },
  {
    name: "Data Compliance",
    href: "#",
  },
  {
    name: "Company",
    href: "#",
  },
  {
    name: "Blockchain Infrastructure",
    href: "#",
  },
];

const socials = [
  {
    name: "Facebook",
    href: "#",
    icon: props => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Discord",
    href: "#",
    icon: props => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M20.317 4.369a19.791 19.791 0 00-4.885-1.515.074.074 0 00-.079.037 13.693 13.693 0 00-.602 1.235 18.155 18.155 0 00-5.421 0 13.645 13.645 0 00-.607-1.235.071.071 0 00-.078-.037 19.792 19.792 0 00-4.885 1.515.068.068 0 00-.032.027c-3.036 4.493-3.85 8.89-3.429 13.229a.081.081 0 00.031.054 19.98 19.98 0 005.994 3.029.073.073 0 00.079-.027 13.78 13.78 0 001.377-2.234.071.071 0 00-.041-.098 13.075 13.075 0 01-1.872-.885.07.07 0 01-.007-.12c.126-.094.252-.192.373-.293a.07.07 0 01.073-.01c3.927 1.793 8.18 1.793 12.061 0a.071.071 0 01.076.01c.121.1.247.198.373.293a.07.07 0 01-.006.12 12.989 12.989 0 01-1.873.884.07.07 0 00-.04.099 13.683 13.683 0 001.377 2.234.073.073 0 00.079.028 19.962 19.962 0 005.996-3.03.077.077 0 00.03-.053c.426-4.339-.392-8.736-3.429-13.229a.067.067 0 00-.03-.027zM8.02 15.736c-1.182 0-2.153-1.085-2.153-2.419 0-1.333.955-2.418 2.153-2.418 1.201 0 2.173 1.085 2.153 2.418 0 1.334-.955 2.419-2.153 2.419zm7.952 0c-1.182 0-2.153-1.085-2.153-2.419 0-1.333.955-2.418 2.153-2.418 1.201 0 2.173 1.085 2.153 2.418 0 1.334-.955 2.419-2.153 2.419z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
  {
    name: "Github",
    href: "#",
    icon: props => (
      <svg fill="currentColor" viewBox="0 0 24 24" {...props}>
        <path
          fillRule="evenodd"
          d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="pt-12 bg-base-200 dark:bg-base-200">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div className="flex justify-center space-x-6 md:order-2">
            {navigation.map(item => (
              <a key={item.name} href={item.href} className="text-gray-400 hover:text-primary">
                <span className="sr-only">{item.name}</span>
                <p>{item.name}</p>
              </a>
            ))}
          </div>
          <div className="mt-8 md:mt-0 md:order-1">
            <Link href={COMPANY_LINK}>
              <p className="text-center text-xs leading-5 text-gray-500">
                &copy; 2020, a build of <span className="text-primary">{COMPANY_NAME}</span> |{" "}
                <span>{COMPANY_DESCRIPTION}</span>
              </p>
            </Link>
          </div>
        </div>
      </div>
      <div className="flex justify-center items-center text-center gap-3 pt-2 pb-8">
        {socials.map(social => (
          <a
            key={social.name}
            href={social.href}
            className="transition hover:ease-in-out text-gray-400 hover:text-primary flex items-center justify-center"
          >
            <span className="sr-only">{social.name}</span>
            {social.icon({ className: "h-6 w-6" })}
          </a>
        ))}
      </div>
    </footer>
  );
}
