const fs = require('fs');
const path = require('path'); 
import { expect } from '@playwright/test';
import { config } from '../Utils/TG_config.js'; // Ensure correct path

class TGLanguagePage {
  constructor(page) {
    this.page = page;
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                  FUNCTION                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
async Login() {
  try {
    const cookiesPath = path.join(config.cookiesDir, config.cookiesFile);
    console.log('Cookies Path:', cookiesPath); // Debugging line

    // Check if the cookies file exists
    if (!fs.existsSync(cookiesPath)) {
      throw new Error(`Cookies file not found at path: ${cookiesPath}`);
    }

    const cookies = JSON.parse(fs.readFileSync(cookiesPath, 'utf-8'));
    await this.page.context().addCookies(cookies);
    await this.page.goto(config.tongramUrl);
    await this.page.waitForLoadState('networkidle');
    console.log('✅ Page loaded successfully with cookies.');
  } catch (error) {
    console.error('❌ Error during login:', error.message);
    throw error;
  }
}


//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
//////////////////////////////////////                 TEST CASE                //////////////////////////////////////
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


  async changeLanguageVI() {
    try {
      await this.page.getByRole('button', { name: 'en', exact: true }).click();
      await this.page.getByRole('link', { name: 'Vietnamese' }).click();

      await expect(this.page.getByPlaceholder('Tìm ứng dụng yêu thích của bạn').first()).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Danh mục' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'DEX' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Tin tức' })).toBeVisible();

      await expect(this.page.getByRole('main').getByRole('link', { name: 'Trò chơi Trò chơi' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Sản phẩm Sản phẩm' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Xã hội Xã hội' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Giải trí Giải trí' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Tài chính Tài chính' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Giáo dục Giáo dục' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Phong cách sống Phong cách số' })).toBeVisible();
      await expect(this.page.getByRole('main').getByRole('link', { name: 'Quản trị Quản trị' })).toBeVisible();     
      
      await expect(this.page.getByRole('heading', { name: 'Khám phá' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Danh mục ứng dụng' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Liên Hệ' })).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Cho nhà phát triển' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Đề xuất ứng dụng' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Hỗ trợ nhà phát triển' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Quảng cáo ứng dụng' })).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Hướng dẫn' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Cách sử dụng' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'FAQs' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Hệ thống điểm thưởng' })).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Pháp lý' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Chính sách bảo mật' })).toBeVisible();
      await expect(this.page.getByRole('link', { name: 'Điều khoản dịch vụ' })).toBeVisible();
      await expect(this.page.getByRole('heading', { name: 'Mạng xã hội' })).toBeVisible();

      await this.page.getByRole('main').getByRole('link', { name: 'Trò chơi Trò chơi' }).click();
      await expect(this.page.getByText('Sắp xếp theo')).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Mới nhất' })).toBeVisible();
      await expect(this.page.getByRole('button', { name: 'Đánh giá cao' })).toBeVisible();

      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
      await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click(); 

      await expect(this.page.getByText('Số dư TGM Coin')).toBeVisible();
      await expect(this.page.getByText('TỔNG SỐ ĐÃ KIẾM')).toBeVisible();
      
      await expect(this.page.getByRole('button', { name: 'Lịch sử' })).toBeVisible();
      
      await this.page.getByRole('button', { name: 'Kiếm thêm' }).click();
      await expect(this.page.getByText('Nhiệm Vụ Hằng Ngày')).toBeVisible();
      await expect(this.page.getByText('Đăng nhập hàng ngày')).toBeVisible();
      await expect(this.page.getByText('Đăng nhập Tongram mỗi ngày')).toBeVisible();
      await expect(this.page.getByText('Nhà Khám Phá Ứng Dụng')).toBeVisible();
      await expect(this.page.getByText('Mở 1 ứng dụng khác nhau trong')).toBeVisible();
      await expect(this.page.getByText('Nhà đánh giá ứng dụng')).toBeVisible();
      await expect(this.page.getByText('Viết đánh giá cho 1 ứng dụng')).toBeVisible();
      await expect(this.page.getByText('Người chia sẻ ứng dụng')).toBeVisible();
      await expect(this.page.getByText('Chia sẻ 1 ứng dụng với bạn b')).toBeVisible();
      
      await expect(this.page.getByText('Nhiệm Vụ Cộng Đồng')).toBeVisible();
      await expect(this.page.getByText('Facebook Follow', { exact: true })).toBeVisible();
      await expect(this.page.getByText('Theo dõi Tongram trên Facebook')).toBeVisible();
      await expect(this.page.getByText('X Follow', { exact: true })).toBeVisible();
      await expect(this.page.getByText('Theo dõi Tongram trên X')).toBeVisible();
      await expect(this.page.getByText('Telegram Join', { exact: true })).toBeVisible();
      await expect(this.page.getByText('Tham gia kênh Telegram của')).toBeVisible();
      await expect(this.page.getByText('Lời mời đầu tiên')).toBeVisible();
      await expect(this.page.getByText('Mời 1 người bạn vào Tongram')).toBeVisible();
      await expect(this.page.getByText('Vòng tròn phát triển')).toBeVisible();
      await expect(this.page.getByText('Mời 10 người bạn vào Tongram')).toBeVisible();
      await expect(this.page.getByText('Người kết nối bạn bè')).toBeVisible();
      await expect(this.page.getByText('Mời 30 người bạn vào Tongram')).toBeVisible();
      await expect(this.page.getByText('Người xây dựng cộng đồng')).toBeVisible();
      await expect(this.page.getByText('Mời 50 người bạn vào Tongram')).toBeVisible();
      
      await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

    } catch (error) {
      console.error('Error during language change:', error);
    }
  }

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////


async changeLanguageEN() {
  try {
    await this.page.getByRole('button', { name: 'en', exact: true }).click();
    await this.page.getByRole('link', { name: 'English' }).click();

    await expect(this.page.getByPlaceholder('Search for your favorite apps').first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Categories' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'DEX' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'News' })).toBeVisible();

    await expect(this.page.getByRole('main').getByRole('link', { name: 'Games Games' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: 'Productivity Productivity' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: 'Social Social' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: 'Entertainment Entertainment' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: 'Finance Finance' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: 'Lifestyle Lifestyle' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: 'Management Management' })).toBeVisible();

    await expect(this.page.getByRole('heading', { name: 'For You' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'For YouSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'New' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'NewSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Recommend' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'RecommendSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Trending' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'TrendingSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Hot' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'HotSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Highest Ranked' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'Highest RankedSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Play to Earn' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'Play to EarnSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Heavily sponsored' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'Heavily sponsoredSee All' }).getByRole('link')).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Sponsored list' })).toBeVisible();
    await expect(this.page.locator('div').filter({ hasText: 'Sponsored listSee All' }).getByRole('link')).toBeVisible();

    await expect(this.page.getByRole('heading', { name: 'Discover' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Apps Categories' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Contact Us' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'For Developers' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Submit your App' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Developer Support' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'App Promotion' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Guidelines' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'How to Use' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'FAQs' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Rewards system' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Legal' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Privacy Policy' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'Terms of services' })).toBeVisible();
    await expect(this.page.getByRole('heading', { name: 'Social' })).toBeVisible();

    await this.page.getByRole('main').getByRole('link', { name: 'Games Games' }).click();

    await expect(this.page.getByText('Sort By')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'Latest' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'High rating' })).toBeVisible();

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click(); 

    await expect(this.page.getByText('TGM Coin Balance')).toBeVisible();
    await expect(this.page.getByText('TOTAL EARNED')).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'History' })).toBeVisible();

    await this.page.getByRole('button', { name: 'Earn More' }).click();
    await expect(this.page.getByRole('button', { name: 'Earn More' })).toBeVisible();

    await expect(this.page.getByText('Daily Task')).toBeVisible();
    await expect(this.page.getByText('Daily Login', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Log in to Tongram every day')).toBeVisible();
    await expect(this.page.getByText('App Explorer', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Open 1 different apps in a day')).toBeVisible();
    await expect(this.page.getByText('App Reviewer', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Write reviews for 1 apps')).toBeVisible();
    await expect(this.page.getByText('App Sharer', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Share 1 apps with your friends')).toBeVisible();

    await expect(this.page.getByText('Community tasks')).toBeVisible();
    await expect(this.page.getByText('Facebook Follow', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Follow Tongram on Facebook')).toBeVisible();
    await expect(this.page.getByText('X Follow', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Follow Tongram on X')).toBeVisible();
    await expect(this.page.getByText('Telegram Join', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Join the Tongram Telegram')).toBeVisible();
    await expect(this.page.getByText('First Invite', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Invite 1 friend to Tongram')).toBeVisible();
    await expect(this.page.getByText('Growing Circle')).toBeVisible();
    await expect(this.page.getByText('Invite 10 friends to Tongram')).toBeVisible();
    await expect(this.page.getByText('Friend Gatherer')).toBeVisible();
    await expect(this.page.getByText('Invite 30 friends to Tongram')).toBeVisible();
    await expect(this.page.getByText('Community Builder')).toBeVisible();
    await expect(this.page.getByText('Invite 50 friends to Tongram')).toBeVisible();

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('Error during language change:', error);
  }
}

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

async changeLanguageKR() {
  try {
    // Click to change language to Korean
    await this.page.getByRole('button', { name: 'en', exact: true }).click();
    await this.page.getByRole('link', { name: 'Korean' }).click();

    // await this.page.waitForTimeout(2000); 

    // Verify Korean language elements
    await expect(this.page.getByPlaceholder('좋아하는 앱을 검색하세요').first()).toBeVisible();
    await expect(this.page.getByRole('button', { name: '카테고리' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: 'DEX' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: '뉴스' })).toBeVisible();

    await expect(this.page.getByRole('main').getByRole('link', { name: '게임 게임' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '생산성 생산성' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '소셜 네트워킹 소셜 네트워킹' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '엔터테인먼트 엔터테인먼트' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '금융 금융' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '교육 교육' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '라이프스타일 라이프스타일' })).toBeVisible();
    await expect(this.page.getByRole('main').getByRole('link', { name: '관리 관리' })).toBeVisible();      

    
    await expect(this.page.getByRole('heading', { name: '알아보기' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '앱 카테고리' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '문의하기' })).toBeVisible();
    
    await expect(this.page.getByRole('heading', { name: '개발자를 위한' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '앱 제출' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '개발자 지원' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '앱 프로모션' })).toBeVisible();
    
    await expect(this.page.getByRole('heading', { name: '가이드라인' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '사용 방법' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: 'FAQs' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '보상 시스템' })).toBeVisible();
    
    await expect(this.page.getByRole('heading', { name: '법적' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '개인정보처리방침' })).toBeVisible();
    await expect(this.page.getByRole('link', { name: '서비스 약관' })).toBeVisible();
    
    await expect(this.page.getByRole('heading', { name: '소셜 네트워크' })).toBeVisible();
    

    await this.page.getByRole('main').getByRole('link', { name: '게임 게임' }).click();

    await expect(this.page.getByText('정렬 기준')).toBeVisible();
    await expect(this.page.getByRole('button', { name: '최신' })).toBeVisible();
    await expect(this.page.getByRole('button', { name: '높은 평가' })).toBeVisible();

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();
    await this.page.locator("(//span[@class='whitespace-nowrap font-semibold'])[1]").click(); 

    await expect(this.page.getByText('TGM 코인 잔액')).toBeVisible();
    await expect(this.page.getByText('총 수익')).toBeVisible();

    await expect(this.page.getByRole('button', { name: '내역' })).toBeVisible();
    
    await expect(this.page.getByText('더 벌기')).toBeVisible();
    await this.page.getByText('더 벌기').click();
    
    await expect(this.page.getByText('데일리 미션')).toBeVisible();
    await expect(this.page.getByText('매일 로그인')).toBeVisible();
    await expect(this.page.getByText('매일 Tongram에 로그인하여 보상을 받으세요')).toBeVisible();
    await expect(this.page.getByText('앱 탐색기')).toBeVisible();
    await expect(this.page.getByText('하루에 1개의 다른 앱을 열어보세요')).toBeVisible();
    await expect(this.page.getByText('앱 리뷰어')).toBeVisible();
    await expect(this.page.getByText('개의 앱에 대한 리뷰를 작성하세요')).toBeVisible();
    await expect(this.page.getByText('앱 공유자')).toBeVisible();
    await expect(this.page.getByText('개의 앱을 친구들과 공유하세요')).toBeVisible();
    await expect(this.page.getByText('커뮤니티 미션')).toBeVisible();
    await expect(this.page.getByText('Facebook Follow', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Tongram 페이스북 페이지를 팔로우하세요')).toBeVisible();
    await expect(this.page.getByText('X Follow', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Tongram X 계정을 팔로우하세요')).toBeVisible();
    await expect(this.page.getByText('Telegram Join', { exact: true })).toBeVisible();
    await expect(this.page.getByText('Tongram 텔레그램 채널에 참여하세요')).toBeVisible();
    await expect(this.page.getByText('첫 초대')).toBeVisible();
    await expect(this.page.getByText('1명의 친구를 Tongram에 초대하세요')).toBeVisible();
    await expect(this.page.getByText('성장 서클')).toBeVisible();
    await expect(this.page.getByText('10명의 친구를 Tongram에 초대하세요')).toBeVisible();
    await expect(this.page.getByText('친구 모으기')).toBeVisible();
    await expect(this.page.getByText('30명의 친구를 Tongram에 초대하세요')).toBeVisible();
    await expect(this.page.getByText('커뮤니티 빌더')).toBeVisible();
    await expect(this.page.getByText('50명의 친구를 Tongram에 초대하세요')).toBeVisible();

    await this.page.getByRole('link', { name: 'Tongram Logo' }).click();

  } catch (error) {
    console.error('Error during language change:', error);
  }
}

}

export default TGLanguagePage;
