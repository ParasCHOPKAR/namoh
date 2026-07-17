import { redirect } from "next/navigation";

export default function BrandsRedirectPage() {
  redirect("/category?category=BRANDS");
}
