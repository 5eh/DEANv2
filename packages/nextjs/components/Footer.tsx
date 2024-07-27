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
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
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
          d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
          clipRule="evenodd"
        />
      </svg>
    ),
  },
];

export default function Footer() {
  return (
    <footer className="pt-12 bg-base-200 dark:bg-base-200">
      <div className="mx-auto max-w-7xl px-6 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex justify-center space-x-6 md:order-2">
          {navigation.map(item => (
            <a key={item.name} href={item.href} className="text-gray-400 hover:text-primary">
              <span className="sr-only">{item.name}</span>
              <p>{item.name}</p>
            </a>
          ))}
        </div>
        <div className=" md:order-1 md:mt-0">
          <Link href={COMPANY_LINK}>
            <p className="text-center text-xs leading-5 text-gray-500">
              &copy; 2020, a build of <span className="text-primary">{COMPANY_NAME}</span> |{" "}
              <span>{COMPANY_DESCRIPTION}</span>
            </p>
          </Link>
        </div>
      </div>
      <div className="flex justify-center items-center gap-3 pt-2 pb-8">
        {socials.map(social => (
          <a
            key={social.name}
            href={social.href}
            className="transition hover:ease-in-out text-gray-400 hover:text-primary"
          >
            <span className="sr-only">{social.name}</span>
            {social.icon({ className: "h-6 w-6" })}
          </a>
        ))}
      </div>
    </footer>
  );
}
