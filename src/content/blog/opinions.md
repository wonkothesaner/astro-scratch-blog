---
title: Learning JavaScript?  Then make sure you tune into Syntax.fm
description: >-
  Why I never miss a Syntax.fm podcast - there's hardly ever a podcast episode
  where I don't learn something useful; even the React ones are typically fun to
  listen to.
pubDate: 2025-07-25
updatedDate: 2026-05-08
heroImage: ../../assets/images/blog/syntaxfm.png
heroImageAlt: Image of the Syntax.fm podcast logo
heroFit: contain
heroPortrait: false
tags:
  - coding
---
## My first Javascript steps&#x20;

This is not my first attempt at writing a post nor at building a website.  Towards the end of the noughties, out of pure curiosity, I  purchased some [Head First](https://en.wikipedia.org/wiki/Head_First_\(book_series\)) books that let me dip a toe in the world of HTML and CSS.  Both of which felt very exotic to the dyed-in-the-wool SAP professional I was pretending to be at the time. &#x20;

In 2015 I decided to stop my SAP bus, get off and take a look around the "digital" world in more detail.  At the time, the world was a very different place compared to now:

* Barack Obama was still President in the US,
* the Tories were in power in the UK (but held back a little in coalition by the Liberal Democrats),
* Brexit was a dream for some rather than a reality for all,
* [Volodymyr Zelenskyy](https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy) was providing the voice for Paddington in movies rather than leading The Ukraine's resistance to Russian aggression.
* And everyone, except my SAP colleagues was talking about "digital transformation" and throwing arounds words like Jenkins, hybris, Continuous Integration, microservices - none of which I understood.

I wanted to understand what **everyone else** was talking about.  Why?  Just in case they were describing a world and work that was more fun than that which I had become accustomed to. &#x20;

So, in the middle of 2015, I took a year off paid-employment.  I took my children to and from nursery and school and filled the remaining spare time by trying to learn how Javascript works. &#x20;

Why Javascript or (more properly in PascalCase) JavaScript? &#x20;

Because JavaScript seemed to be the thing that powered the majority of excitement around "digital transformation" at the time.  Especially if, in a lazy definition, one took "digital transformation" to mean delivering "better" websites.&#x20;

Note - for the rest of this article, I will call my SAP colleagues as "**SAPpers**" who speak "**SAPanese**" and everyone else "**The Rest**" or "**Restians**" (yes, partly as a play on REpresentational State Transfer!)

## What I learnt back in 2015

What I learnt back in 2015 was that, in the **Rest** world, there appeared to be no single and agreed right way to do pretty much anything at all.  The answer depended not just on what you wanted to do but also, very often, who you were prepared to listen to and then what you chose to believe. Many different people seemed to propose many different approaches all trying to achieve the same sort of results.  Angular (Google) and React (Meta née Facebook) were rising up.  One was a "library" and the other a "framework".  This seemed to matter to some but I honestly couldn't fathom why.&#x20;

Honestly, in a world in which you could often do something either "this" way or "that" way, there seemed to be some who said "this" was better than "than" and many who said the opposite.  And both appeared that they could be right. &#x20;

Part of the challenge seemed to me to be summed up by the implication of the title of Douglas Crockford's book "[JavaScript: The Good Parts](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/)", i.e. the JavaScript language itself has some intrinsic "quirks".  I'll readily admit that I didn't (and still don't) understand much of what I read in Crockford's book (especially the bits about lexical scope and closures) but I still have the book on the shelf and occasionally flick through it. &#x20;

I also remember seeing the name [Wes Bos](https://wesbos.com/) and his training courses.  At the time I thought he was a bit too loud for my tastes and, anyway, I preferred to get my learning from books rather than from online video tutorials. &#x20;

We'll come back to Wes later.

## Opinions more than facts?&#x20;

In short, **opinions** seemed to matter as much, if not more, than **facts**. &#x20;

Frameworks such as Angular were even described as opinionated. &#x20;

I struggled with this enormously as I tend towards a worldview that we are collectively more likely to make "progress" if we share a set of well understood and agreed facts rather than argue from perspectives based on opinions.

Of course, I recognise that agreeing on what is meant by "progress" is an important first step and that the 2016 Brexit vote, in the UK if nowhere else, went on to challenge the idea that anyone could agree what "progress" meant.  And, unfortunately, I'd argue that the current actions of the 45th/47th President of the United States are based on opinions more than facts. &#x20;

Perhaps Donald would disagree with Daniel and me on the following:

> "Everyone is entitled to his own opinion, but not to his own facts."\
> <cite>Daniel Patrick Moynihan, United States Senator, 1927-2003</cite>

For now I'll just add my penny's worth to the 2015 opinions pot (remember I was new and inexperienced) &#x20;

* **Stay away from CSS, it's way too complicated.**  Find Bootstrap, Bulma, something that has abstracted away all the crazy Browser stuff!  Who could imagine that different people writing code for the same application, i.e. web browsing, could interpret "web standards", e.g. CSS, in a some many different ways. &#x20;
* **Watch out, watch out there's a change about** - how do you keep up to date?  I see all different versions of the same language, there's talk of polyfills, what's that all about?  It's worse than the [Tower of Babel](https://en.wikipedia.org/wiki/Tower_of_Babel) coming down.  Now, if only we could think of a name for a transpiler ([sorry compiler](https://stackoverflow.com/questions/43968748/is-babel-a-compiler-or-transpiler)) that can take JavaScript code written in one version and have it be understood by a browser that only understands an earlier version...
* **Images** **are not simple** - sure the \<img> tag looks simple enough but let me introduce you to responsiveness, resolution, and aspect ratios.  There's a world of hurt hiding in plain sight, typically tagged with a .jpg or .png extension.&#x20;
* **Pick one to learn - the client or server** - the SAP world I inhabited was relatively simple compared to the back, front (and middle) ends of the web.  Ryan Dahl had released Node.js in 2009 so that JavaScript could run on both the back and front ends of your "stack" but you still seemed to have to pick one area to major in.&#x20;
* **I'm no fan of React**.  Period.  I'm never going to (knowingly) reach for it in any of the work that I look to do.  Why? Partly because it's born out of Facebook/Meta and I have a low personal opinion of Mark Zuckerberg. Partly because the concept of a shadow DOM (as I understood it at least) seemed to be overkill and, to an extent, orthogonal to "ways of the web".      &#x20;

Fortunately, it turned out that there was a lot of "progress" in the JavaScript part of the **Rest** world in the years that followed 2015 although that's perhaps a subject for a future post on Browsers and the role of ECMAScript. &#x20;

All of the opinions I formed in 2015 as stated above have changed in the decade since.  Except the React one, to which I've added "because everyone uses it" as a rationale as I like to think I'm a bit of a contrarian.&#x20;

Anyway, I digress...back to the journey.

## Back to SAP-world

I stopped trying to learn JavaScript in 2016 and went back to SAP and my fellow **SAPpers**.  We spent the next ten years looking at columnar in-memory databases, "semi-proprietary" Fiori UX, and building out ways to read and write to the business process logic in the Core application that SAP themselves claimed was largely "finished", despite appearances to the contrary. &#x20;

But over the last decade as a result of that year out in 2015 looking at the "digital transformation" world, I had a much improved and greater understanding of what **The Rest** were talking about.  **The Rest** talked about CI/CD, Semantic Versioning, Domain Driven Design (DDD), pull requests, ontologies, data meshes, event driven architectures, eventual consistency. &#x20;

**The Rest** and **SAPpers** perhaps came closest in the browser, where both still needed to use JavaScript frameworks and libraries to deliver User Experiences that felt modern and aligned with the experiences enterprise users were able to access on their phones in their private lives. &#x20;

But, even if they met at the browser, **The Rest** and **SAPpers** quickly found that they didn't understand each other and seemed to speak different languages.  It remains rare, by my observation, to find any one person that can speak both **SAP**anese and **Rest**ian.

## Looking for the Rosetta Stone

I stopped doing SAP work again in 2025.  For good this time. &#x20;

I've gont back to learning JavaScript - this time with some help from Claude and Gemini (not Grok, ChatGPT).

And also with a lot of help Wes Bos, Scott and CJ at [Syntax.fm](https://syntax.fm/), who have just recorded their 1,000 podcast.  I am sure there are other podcasts and blogs out there that look to try and do the same sort of things as Wes, Scott and CJ but I've yet to find one that does it as well as they do. &#x20;

Not every episode is directly relevant to what I am working on nor do I understand everything they or their guest say.  But I always find something that I can take away from every episode.  Something that I can look after the podcast and learn from.  Many times I've added to my list of tools to use and approaches to take.  I can't recommend the show enough and, yes, Scott is the brake that I needed ten years ago to curb Wes' accelerator - I think I would tire quickly and switch off if it was just the Wes Bos show\...

Anyway to get to the main point of this post, Wes and Scott ran a Potluck episode ([970 in January 2026](https://syntax.fm/show/970/why-did-anthropic-buy-bun/transcript)) and the last question and answer was illuminating.  It was the first time I saw **Restians** acknowledge in attributable and reputable way (whatever one thinks of Wes' communication style he is seen as a [referenceable resource](https://2025.stateofjs.com/en-US/resources/) in the JavaScript community) that **SAPanese** was a foreign language.

> In my daily job, I work with modern web technologies.  But over the last year, due to a new direction in our company, I've had to start learning SAP UI5.  It's basically a web world inside SAP.  Have you ever come across this technology? I'm still surprised how big the ecosystem of languages and frameworks is inside of larger enterprises and how little it's talked about. It feels like a hidden world with a lot of potential.&#x20;
>
> <cite>The Questioner</cite>

> Wes - I'm gonna say I have zero clue.
>
> Scott - I have no clue. Nothing.
>
> <cite>TL;DR The two immediate answers from Wes and then Scott</cite>

Listening further yields this follow on commentary from Wes (which abridged in places as shown by (...)

> (...)I thought this was an interesting question because when I was in school, a big thing that we had to learn was called ERP.  And they're, like, these large companies who do accounting and inventory, sourcing products. Like, I remember the one example we had to do for SAP was somebody was making granola, and you had 18 vendors from around the world to get all of the pieces to make your granola. You know? You had to get almonds from Mexico(...)And, like, they all had different prices, and they all have different lead times.  And in order to make a simple granola, it was a very complex thing, and then you had, accounts payable, ledgers, all of that stuff sort of built into it.&#x20;
>
> And these huge companies are built on SAP. SAP is a massive, massive company. And I remember hating my life doing this because it was a Java (sic.) app where it was just looked awful, and you never knew where to click, and and that nothing ever worked, and it was errors out the wazoo, and you had to do it on a desktop.&#x20;
>
> (...)I was like, I wonder where SAP is at. You know? So (...) I just looked it up. There's this thing called SAP UI5. It looks like they moved everything over to their own custom MVC JavaScript framework.  And that's cool because, like, obviously, this stuff needs to be able to run everywhere. This is why you should bet on the web. This, like, massive company, which was built on Java, is now (...) all done in JavaScript.&#x20;
>
> I went to the docs, and I thought it was hilarious because they have a a chart of, like, how things work together.  And that chart is done in a PNG that's probably exported from some Photoshop or something. (...)
>
> But it's it I kinda they built their own. Like, it's not built on React or Angular or Svelte or anything. They made their own MVC framework.

And then they both finish by saying

> Wes - \[it certainly is] an area where I remember in school, everyone's like, you can make a buck if you know SAP. Similar to, like, SharePoint as well, you know, where it's just like, I'm specializing in this odd thing (...) I know all the ins and outs of this thing, and I'm gonna make bucks charging these massive companies, who just wanna make granola, how to implement it.
>
> Scott - This is a whole world where I am just completely out to lunch on.&#x20;

## In conclusion

It is my opinion (not yet a proven fact) that how best to bring these two worlds (the **SAPanese** and **Restian** speaking worlds) closer together remains one of the single largest challenges that my IT sector colleagues have to overcome in the coming 10-20 years. &#x20;

I started this blog partly because I want to explore the ways that I think the two worlds can come together in some of the posts that will follow.
