import { test, expect } from "@playwright/test";
import { chromium } from "playwright";

const API_KEY = "YOUR_2CAPTCHA_API_KEY"; // Thay bằng API key của bạn từ 2Captcha bỏ qua vì tính phí
const SITE_KEY = "6LedlyYqAAAAAGlJT3_1aX5l08p9mrMw5gAPez65"; // Thay bằng site key của CAPTCHA
const PAGE_URL = "https://tongram.app/"; // URL trang chứa CAPTCHA

test("Contact form automation with CAPTCHA", async () => {
  const browser = await chromium.launch({ headless: false });
  const context = await browser.newContext();
  const page = await context.newPage();

  // Điều hướng đến trang liên hệ
  await page.goto(PAGE_URL);
  await page.getByRole("link", { name: "Contact Us" }).click();

  // Điền form
  await page.getByPlaceholder("Your Full Name").fill("QC Check");
  await page.getByPlaceholder("Your Subject").fill("Support For ME");
  await page.getByPlaceholder("Email Address").fill("Anonymous@gmail.com");
  await page
    .getByPlaceholder("Write Here Your Message")
    .fill("auto test check contact form");

  // Lấy hình ảnh CAPTCHA hoặc iframe
  const captchaIframe = await page.frameLocator(
    'iframe[name="a-759h81soqsn5"]'
  );

  // Tạm dừng để bạn có thể tự giải CAPTCHA
  console.log("Vui lòng tự giải CAPTCHA trong 15 giây...");
  await page.pause();
  // await page.waitForTimeout(15000); // Đợi 10 giây, bạn có thể tăng thời gian nếu cần

  // Điền kết quả CAPTCHA vào form (nếu cần thiết)
  // Bạn có thể thêm mã để lấy giá trị CAPTCHA từ iframe nếu cần
  // Ví dụ: await captchaIframe.getByLabel("I'm not a robot").fill(captchaResponse);

  // Gửi form
  await page.getByRole("button", { name: "Send Message" }).click();

  // Đóng trình duyệt
  await context.close();
  await browser.close();
});
