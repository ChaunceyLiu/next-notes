import { match } from "@formatjs/intl-localematcher";
import Negotiator from "negotiator";
import { NextResponse } from "next/server";
import { locales, defaultLocale } from "@/config.js";
import { auth } from "auth";

const publicFile = /\.(.*)$/;
const excludeFile = ["logo.svg"];

function getLocale(request) {
  const headers = {
    "accept-language": request.headers.get("accept-language") || "",
  };
  // 这里不能直接传入 request，有更简单的写法欢迎评论留言
  const languages = new Negotiator({ headers }).languages();

  return match(languages, locales, defaultLocale);
}
//  export { auth as middleware } from "auth"
export async function middleware(request) {
  // 执行身份验证
  const authResponse = await auth(request);
  console.log("authResponse", authResponse.aborted);
  // if (authResponse) return authResponse;

  const { pathname } = request.nextUrl;
  // 判断请求路径中是否已存在语言，已存在语言则跳过
  const pathnameHasLocale = locales.some(
    (locale) => pathname.startsWith(`/${locale}/`) || pathname === `/${locale}`
  );

  if (pathnameHasLocale) return;

  // 如果是 public 文件，不重定向
  if (
    publicFile.test(pathname) &&
    excludeFile.indexOf(pathname.substr(1)) == -1
  )
    return;

  // 获取匹配的 locale
  const locale = getLocale(request);
  request.nextUrl.pathname = `/${locale}${pathname}`;
  if (locale == defaultLocale) {
    return NextResponse.rewrite(request.nextUrl);
  }
  // 重定向，如 /products 重定向到 /en-US/products
  return Response.redirect(request.nextUrl);
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
