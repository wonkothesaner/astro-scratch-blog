---
title: Syntax.fm, SAP, and the Rest of the World
description: >-
  How recently listening to a Syntax.fm episode confirmed an opinion that I have held for a while.
pubDate: 2025-07-25
updatedDate: 2026-05-12
heroImage: ../../assets/images/blog/syntaxfm.png
heroImageAlt: Image of the Syntax.fm podcast logo
heroFit: contain
heroPortrait: false
tags:
  - coding
---

## Syntax.fm - a podcast well worth listening to

Wes Bos and Scott Tolinski run a podcast called [Syntax.fm](https://syntax.fm/) which recently dropped its 1,000th episode.

I have been listening for a couple of years now and particularly enjoy their potluck episodes in which they answer their audience's questions. One such Potluck episode was [number 970 in January 2026](https://syntax.fm/show/970/why-did-anthropic-buy-bun/transcript) and, specifically, their combined answer to the last question triggered me to write this post.

Here's the question and their answer:

> <cite>The Questioner asked...</cite>
>
> "In my daily job, I work with modern web technologies. But over the last year, due to a new direction in my company, I've had to start learning SAP UI5. It's basically a web world inside SAP. Have you ever come across this technology? I'm still surprised how big the ecosystem of languages and frameworks is inside of larger enterprises and how little it's talked about. It feels like a hidden world with a lot of potential."

> <cite>TL;DR a summary of Wes and Scott's answers...</cite>
>
> Wes - I'm gonna say I have zero clue.
>
> Scott - I have no clue. Nothing.

These answers are backed up by some more dialogue from Wes specifically, which I have included below and abridged in places as shown by _(...)_

> I thought this was an interesting question because when I was in school, a big thing that we had to learn was called ERP. And they're, like, these large companies who do accounting and inventory, sourcing products. Like, I remember the one example we had to do for SAP was somebody was making granola, and you had 18 vendors from around the world to get all of the pieces to make your granola. (...) You had to get almonds from Mexico (...) and, like, they all had different prices, and they all have different lead times. And in order to make a simple granola, it was a very complex thing, and then you had, accounts payable, ledgers, all of that stuff sort of built into it.
>
> And these huge companies are built on SAP. SAP is a massive, massive company. And I remember hating my life doing this because it (...) just looked awful, and you never knew where to click, and that nothing ever worked (...)
>
> (...) I was like, I wonder where SAP is at. You know? So (...) I just looked it up. There's this thing called SAP UI5. It looks like they moved everything over to their own custom MVC JavaScript framework. And that's cool because, like, obviously, this stuff needs to be able to run everywhere. This is why you should bet on the web. This, like, massive company, which was built on Java _(sic.)_, is now (...) all done in JavaScript.
>
> But it's it I kinda they built their own. Like, it's not built on React or Angular or Svelte or anything. They made their own MVC framework.

And then they both finish by saying

> Wes - [it certainly is] an area where I remember in school, everyone's like, you can make a buck if you know SAP. Similar to, like, SharePoint as well, you know, where it's just like, I'm specializing in this odd thing (...) I know all the ins and outs of this thing, and I'm gonna make bucks charging these massive companies, who just wanna make granola, how to implement it.
>
> Scott - This is a whole world where I am just completely out to lunch on.

Now it turns out that I know a little bit about the "SAP world" and I will admit that I made a buck or two implementing it although never to a granola company. I know more about SAP than I know about the things Wes and Scott talk about although my knowledge of "their world" is improving too.

It is my strong opinion that one of the biggest opportunities in the coming years will be helping the citizens of Wes and Scott's web development world better understand those living in SAP land. And vice versa.

And why is that so? Well the answer to that question starts with three definitions and then some more history...

## Three Definitions

Before going further, I would like to sketch out what I mean by three terms -

1. **SAP** refers to the products and services delivered by a German software company.

- Very little SAP is written in Java (hence my inclusion of (sic.) in the transcript of Wes' comments above) and, despite being one of the largest software companies in the world, many people have never heard of it.
- This is largely because it sits (often invisibly) in the "back office" of large commercial and government organizations running their sales, production, purchasing, logistics, warehouse, HR, finance and other operations.
- SAP is huge, too large for any one person or, honestly, organization to understand.
- It turns out that some SAP products are exceptionally good, some are reasonable and a few are (frankly) terrible, which is why just saying the three-letter acronym SAP without qualifying "which part of SAP" you're referring to is a dangerous thing to do.

2. Wes/Scott's world is the world of **web development**

- they typically focus on the use of JavaScript, HTML and CSS to build front and back-end web applications.
- the front-ends run in browsers such as Chrome, Safari or Firefox and on PCs, phones, and increasingly cars and other devices.
- the back-ends run on hardware that is sitting in a data center somewhere or other, which typically has to be accessed via a Cloud rather than a direct network connection these days

3. **Enterprise IT/OT** is the discipline of bringing IT (Information Technology - human and code) and OT (Operational Technology - machines, things and code) together in an organization (the "enterprise").

- Organizations can be in the private or public sector and can be incentivised to optimize profit or be run as a non-profit.
- Lots of money is spent on Enterprise IT/OT every year.

## History Part 1 - my first JavaScript steps

This is not my first attempt at writing a blog post, nor at building a website.

Towards the end of the noughties, out of pure curiosity, I purchased some [Head First](<https://en.wikipedia.org/wiki/Head_First_(book_series)>) books that let me dip a toe in the world of HTML and CSS. Both of which felt very exotic to the dyed-in-the-wool SAP professional I was pretending to be at the time. I found the books pitched at the right level for a complete noob like myself and I reflect now that I personally prefer learning from text more than I do YouTube videos.

It was around this time that I remember seeing the name [Wes Bos](https://wesbos.com/) for the first time. Wes had a number of online training courses. At the time, I thought he was a bit too loud for my tastes and, anyway, as noted already, I prefer getting my learning from books rather than from online video tutorials. I will explain how I eventually managed to listen to him in a bit.

## History Part 2 - A year out in 2015

Later, in 2015, I heard everyone at work talking about "**digital transformation**". Everyone except my SAP colleagues. Everyone else was throwing around words like Jenkins, hybris, Continuous Integration, microservices and seemed to think they had genuinely discovered something new to do.

I didn't understand what they were talking about but wanted to. Why?

Just in case they were describing a world and work that was more fun than that which I had become accustomed to.

Just for a bit of further context (and perhaps some fond memories), the world was a very different place in 2015 compared to now:

- Barack Obama was still President in the US,
- the Conservatives were back in full-power in the UK (having previously been held back a bit in coalition by the Liberal Democrats since 2010),
- Brexit was a dream for some rather than a reality for all,
- [Volodymyr Zelenskyy](https://en.wikipedia.org/wiki/Volodymyr_Zelenskyy) was providing the voice for Paddington in movies rather than leading Ukraine's resistance to Russian aggression.

So, in the middle of 2015, I decided to stop riding the SAP bus, took a year out of paid-employment, and started to take a proper look around the "digital" world (I didn't know at the time that this was where Wes and Scott also lived). I took my children to and from nursery and school and filled the remaining spare time by trying to learn how JavasSript works.

Why JavaScript?

Because JavaScript seemed to be the thing that powered the majority of excitement around "digital transformation" at the time. Especially if, in a lazy definition, one took "digital transformation" to mean delivering "better" websites.

Note - for the rest of this article, I will call my SAP colleagues "**SAPpers**" who speak "**SAPanese**" and everyone else "**Restians**" speaking "**Restian**" (yes, partly as a play on REpresentational State Transfer!)

## History Part 3 - what I learnt back in 2015

What I learnt back in 2015 was that, in the **Restian** world, there appeared to be no single and agreed right way to do pretty much anything at all. The answer depended not just on what you wanted to do but also, very often, who you were prepared to listen to and then what you chose to believe.

Many different people seemed to propose many different approaches all trying to achieve the same sort of results. Angular (Google) and React (Meta née Facebook) were rising up. One was a "**library**" and the other a "**framework**". This seemed to matter to some but I honestly couldn't fathom why.

Honestly, in a world in which you could often do something either "this" way or "that" way, there seemed to be some who said "this" was better than "that" and many who said the opposite. And both appeared that they could be right. The only exception to this appeared to be those answers on StackOverflow that had been seen and upvoted sufficiently that they could be considered the "wisdom of the crowd".

Part of the challenge seemed to me to be summed up by the implication of the title of Douglas Crockford's book "[JavaScript: The Good Parts](https://www.oreilly.com/library/view/javascript-the-good/9780596517748/)", i.e. the JavaScript language itself has some intrinsic "quirks" which invite opinionated debate. I'll readily admit that I didn't (and still don't) understand much of what I read in Crockford's book (especially the bits about scope and closures) but I still have the book on the shelf and occasionally flick through it.

### So which should it be - opinions or facts?

In short I learnt that **opinions** seemed to matter as much, if not more, than **facts** in the **Restian** world. Indeed, frameworks like Angular were even described as **opinionated**.

I struggled with this enormously as I tend towards a worldview that we are collectively more likely to make "_**progress**_" if we share a set of well understood and agreed facts rather than argue from perspectives based on opinions.

After all, I grew up in a world where:

> "Everyone is entitled to [their] own opinion, but not to [their] own facts."
> <cite>Daniel Patrick Moynihan, United States Senator, 1927-2003</cite>

Of course, I recognise that agreeing on what is meant by "_**progress**_" is an important first step. The 2016 Brexit vote, in the UK if nowhere else, went on to challenge the idea that we can collectively agree on what "progress" means. I observe the trend continuing as I'm sure there are many today who would argue whether the current actions of the 45th/47th President of the United States are sound, and are based on opinions rather than facts.

Enough politics, back to the **SAP** and **Restian** journey...

## History Part 4 - back to SAP-world

I stopped trying to learn JavaScript in 2016 and went back to SAP and my fellow **SAPpers**.

In this **SAP world**, we didn't have to deal with the level of ambiguity I had glimpsed in the **Restian** world. In our world, there was the Walldorf (SAP's Headquarters in Germany) view of the world. Full stop. Period.

And during these last ten years, as a result of my year living in the **Restian** world looking at their way of delivering "**digital transformation**", I thought I had a much greater understanding of what **Restians** were talking about. **Restians** were talking about CI/CD, Semantic Versioning, custom software development, Domain Driven Design (DDD), pull requests, ontologies, data meshes, event driven architectures, eventual consistency and much, much more.

Most, if not all, of it was _gobbledygook_ to a **SAPper** mainly because the terms were associated with solving **Restian** problems **SAPpers** never faced.

Yes, we wrote custom code if Walldorf's view did not work but we only coded as a last resort. And because it was a last resort we never had to face many of the problems that appeared endemic in the **Restian** world.

We **SAPpers** spent the decade from 2015 looking at in-memory columnar databases, trying to build engaging user experiences with SAP's Fiori applications and (semi-proprietary) SAP UI5 framework that wanted to read and write to the business process logic in the Core application that SAP themselves claimed was largely "finished", despite appearances to the contrary.

Over time, I observed that one of the places **Restians** and **SAPpers** came closest was in the browser. Here both needed to use JavaScript frameworks and libraries as they tried to deliver user experiences that felt as modern to their Enterprise IT/OT user base as the ones those same users could access in their personal lives from the phones in their pockets. **Restians** and **SAPpers** also met, and typically tripped over each other, in the areas of data and integration.

And, wherever they seemed to meet, **Restians** and **SAPpers** quickly found that they didn't understand each other. They seemed to be speaking different languages.

And this lack of understanding remains despite the considerable _**progress**_ made by the **Restians** in the years that followed 2015 to address many of the ambiguities that I found so challenging. That subject is worthy of a separate post on Browsers and the role that has been played by ECMAScript governance.

It remains very rare, by my observation, to find any one person that can speak both **SAPanese** and **Restian**.

## Here and now

I stopped doing SAP work again in 2025. I'll perhaps explore the reasons why I stopped in a later post but, for this one, all that is relevant is that I have vowed not to return full-time to the SAP world as a **SAPper**.

Since May last year, I've gone back to learning JavaScript - this time with some help from Claude and Gemini (but not Grok or ChatGPT).

And also with a lot of help from Wes and Scott at [Syntax.fm](https://syntax.fm/). I am sure there are other podcasts and blogs out there that look to do the same thing as Wes, Scott (and now CJ!) but I've yet to find one that does it as well as they do (although [New York Times' Hard Fork](https://www.nytimes.com/column/hard-fork) comes a close second). I always enjoy Wes and Scott's interactions (repartee?), and, even though not every episode is directly relevant to me, I typically learn a thing or two from every episode.

I can't recommend the show enough and, yes, Scott is the brake that I needed ten years ago to curb Wes' accelerator - I think I would tire quickly and switch off if it was just the Wes Bos show...

## In conclusion - looking for the Rosetta Stone

One of the reasons I started this blog and website is because I want to explore the ways that the two worlds, SAP and Restian, can come together.

The Syntax episode from January 14th 2026 was the most explicit attributable **Restian** acknowledgement of the challenge I see and it came from a reputable source (whatever one thinks of Wes' communication style he is seen as a [referenceable resource](https://2025.stateofjs.com/en-US/resources/) in the JavaScript community).

In reality, it is my opinion (I cannot state it as a fact) that both **Restians** and **SAPpers** need to find a Rosetta Stone.

Something that will allow them to better understand what the other is saying. Allow them to understand how each side looks to solve the sorts of problems every business has, e.g. how to attract and keep customers, how to add value, how to engage and pay suppliers, how to demonstrate compliance, how to keep their employees engaged.

They need this Rosetta Stone exactly because **Restians** and **SAPpers** live in the same real world, largely trying to solve the same problems and they each need to minimize the risk of duplicating and/or undermining the effort and output of the other.
