# money-loaning
my based-internship project at school
since not experiencing any online loaning website yet, my project cannot be perfect as other running website outside, but it contains most of features of any online loaning websites own: interface (home, about, news, payment instruction, consulting answer), log in, strict register policy, interest calculator, payback countdown
drawback: Vietnamese content, update English ver later

INTEREST AND MATURITY DATE (adjust as you need):
- If user loans lower than 10m, interest will be 2%/month (24%/year), maturity date is after 6 month as loan request accepted
- If user loans lower than 20m, interest will be 2.2%/month (26.4%/year), maturity date is after 12 month as loan request accepted
- If user loans lower than 30m, interest will be 2.5%/month (30%/year), maturity date is after 18 month as loan request accepted

Install: - npm i express express-handlebars handlebars mongoose
         - npm i husky lint-staged morgan node-sass nodemon prettier --save-dev

Run: npm start
     incase changin scss file, open another terminal, then run npm run watch to update corresponding css file
     
