'use strict';

// use 'ask-sdk' if standard SDK module is installed
const Alexa = require('ask-sdk');
const aws =  require('aws-sdk');
aws.config.update({
    region: 'us-east-1'
});

const TITLE_ONE = ['trump', 'donald trump'];
const TITLE_TWO = ['russian secret-spilling site', 'russian secret spilling site', 'russian secret spill site', 'russia'];
const TITLE_THREE = ['wildfires california', 'wildfire california', 'wildfire in california', 'wildfires in california', 'wildfire', 'california', 'wildfires'];

const ENTITY_ONE_ONE = ['national rifle association', 'nation rifle association', 'national rifle associate'];
const ENTITY_ONE_TWO = ['president hassan rouhani', 'hassan rouhani'];
const ENTITY_ONE_THREE = ['koch brothers', 'koch brother'];
const ENTITY_TWO_ONE = ['russia'];
const ENTITY_THREE_ONE = ['lakeport', 'lake port'];


const FIRST_STORY_ONE = 'President Donald Trump tweeted on Tuesday he is consulting with the National Rifle Association over whether it makes sense for a Texas company to publish downloadable blueprints for a 3D-printed gun. Trump spoke after eight states filed suit against the administration, contending the hard-to-trace plastic weapons that fire real bullets are a boon to terrorists and criminals and threaten public safety. The suit, filed Monday in Seattle, asks a judge to block the federal government’s late-June settlement with Defense Distributed, which allowed the company to make the plans available online.';
const FIRST_STORY_TWO = 'Mr Trump said he could meet President Hassan Rouhani with "no preconditions" at "any time", after the two traded hostile threats earlier this month. Iranian state media quoted politicians as saying such talks would have "no value" and be "a humiliation". In May, the US abandoned a deal which curbed Iran\'s nuclear activities in return for the lifting of sanctions. The US is deeply suspicious of Iranian activity in the Middle East and is an ally of Israel and Saudi Arabia, two of Iran\'s foes.';
const FIRST_STORY_THREE = 'Donald Trump has launched an extraordinary attack on the Koch brothers, accusing the Republican megadonors of opposing his government\'s agenda. \"The globalist Koch Brothers, who have become a total joke in real Republican circles, are against Strong Borders and Powerful Trade,\" the US president wrote on Twitter early on Tuesday morning. Mr Trump\'s outburst came after the Koch brothers\' political arm declared it would not help elect a Republican senate candidate in North Dakota, partly over his failure to challenge the White House\'s trade tariffs. The decision sent a strong message to Republican officials across the country unwilling to oppose the spending explosion and protectionist trade policies embraced by Mr Trump. \”For those who stand in the way, we don\'t pull any punches, regardless of party,\” Tim Phillips, who leads the Kochs\' political arm Americans For Prosperity (AFP), told hundreds of donors during a three-day private Rocky Mountain retreat. But a furious Mr Trump hit back, claiming he made Charles and David Koch \"richer\", and that they \"love\" his tax cuts, deregulation and judicial nominations.';
const FIRST_STORY_ONE_ENTITY = 'The National Rifle Association (NRA) is suing Seattle over a city law requiring gun owners to lock up their firearms. The lawsuit, brought by the NRA along with the Second Amendment Foundation and two city residents, was filed late last week in King County Superior Court in Washington state, which has a regulation prohibiting cities from issuing firearms regulations.';
const FIRST_STORY_TWO_ENTITY = 'The Iranian president, considered a moderate, has previously threatened to close the strait in response to US President Donald Trump\'s threat to stop Iranian oil exports through the waterway. The strait is one of the world\'s most important maritime trade routes and connects the oil-rich Persian Gulf to the Indian Ocean.';
const FIRST_STORY_THREE_ENTITY = 'Steve Bannon has a warning for candidates supported by the conservative Koch political donor network – just ahead of crucial midterm elections this fall. \"You take Koch money, it\'s going to be toxic. We are going to let people know that if you take Koch money there\'s a punishment,\" Bannon, former chief White House strategist and Trump campaign chief executive, told CNBC in an exclusive interview. \"If you take money from people who are against the president and are looking to put a knife in the back of the president, you are going to pay.\" The strategist declined to elaborate on what the punishment would look like. The Koch network traditionally backs Republican candidates, but has recently said it is open to supporting Democrats who favor the group\'s policies.';

const SECOND_STORY_ONE = 'Over the past three months, a handful of highly placed Russians have discovered their secrets seeping onto the web. It happened to a Russian Interior Ministry official whose emails were published online in April. It happened again this month, when details about a former Kremlin chief of staff\'s American energy investment were exposed by Britain\'s Guardian newspaper. A key source for the recent stories has been Russian opposition figure Mikhail Khodorkovsky\'s new project, dubbed the Dossier Center. Launched in November, the center is billed as an investigative unit. Its website features a sprawling, interactive diagram of interconnected Russian officials described as the \"main beneficiaries\" of Russian corruption. The exiled former energy executive is funding the Dossier Center himself and said it was born out of frustration with the inability of journalistic investigations to lead to real change in a Russia dominated by his foe, President Vladimir Putin. He wanted the project to produce more than occasional stories and to gather enough actionable information on the Kremlin\'s leadership to bring its members, eventually, to court. By his telling, the center gets its data from a series of anonymous digital drop boxes . The leaks carry evidence not only of high-level corruption in Moscow, but of the Kremlin\'s \"illegal attempts to influence Western public opinion and Western politicians,\" he said.';
const SECOND_STORY_ONE_ENTITY = 'Trump Can\'t Split Russia From China Yet When Henry Kissinger traveled to China in 1971, he did more than end nearly a quarter-century of estrangement between Washington and Beijing. He also managed the diplomatic coup of splitting America\'s foremost enemies, China and the Soviet Union, and thereby vaulting the U.S. from a position of strategic overstretch to one of strategic advantage. Now that America is facing renewed hostility with Moscow and Beijing, the Donald Trump administration has reportedly been thinking about trying to repeat the performance, this time by conciliating Russia in hopes of turning it against an increasingly formidable China. It\'s a neat idea for a superpower under strain, but it probably won\'t work until things get both much better and much worse.';
const THIRD_STORY_ONE = 'Twin wildfires tearing through vineyards and brushy hills threatened some 10,000 homes Tuesday in Northern California — yet another front in the battle against the flames that have ravaged some of the state\'s most scenic areas. The two fires straddling Mendocino and Lake counties had burned seven homes along 116 square miles (300 square kilometers) of rural land. Fire crews were able to slow the spread of one of the blazes into populated areas and instead the fire pushed into the Mendocino National Forest. In Lake County, evacuation orders were in effect for the 4,700-resident town of Lakeport along with some smaller communities and a section of the national forest. In all, some 15,000 people have been warned to flee, fire officials said. Lakeport, north of San Francisco, is the county seat and a popular destination for bass anglers and boaters on the shores of Clear Lake. But by Monday night it was a ghost town, the main streets deserted. The blaze, which killed two firefighters and four civilians including two children, has also destroyed 311 outbuildings and damaged 165 homes, McLean said. More than 27,000 people remained evacuated from their homes, although another 10,000 were allowed to return Monday as fire crews reinforced lines on the western end of the Carr Fire. Some 12,000 firefighters were battling the blaze. Fire officials were hopeful that they could make progress containing the blaze, which was 23 percent contained.';
const THIRD_STORY_ONE_ENTITY = 'The evacuated residents of Lakeport anxiously watch and wait. The town has been spared, so far, but the threat of fire and destruction remain. Lakeport is center stage in this incendiary drama. The entire town with a population of about 5000 was evacuated Sunday because flames were moving toward the community. The raging fire that threatened the town Sunday night has diminished considerably. Mike Von Rosenberg evacuated from Lakeport. He’s at the Lower Lake high school shelter. \"Looks a lot better…looks like they’re getting a big time handle on it and everything,\" said Von Rosenberg. \"God bless those guys…maybe they\'ll get a few medals.\"';

// Code for the handlers here
const LaunchRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'LaunchRequest';
    },
    async handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;

        const attributes = await attributesManager.getPersistentAttributes() || {};
        if (Object.keys(attributes).length === 0) {
          attributes.prevIntent = '';
          attributes.prevSlotName = '';
          attributes.prevSlotValue = '';
          attributes.story1Pos = 1;
          attributes.story2Pos = 1;
          attributes.story3Pos = 1;
        }

        attributesManager.setSessionAttributes(attributes);

        const speechText = 'Welcome to news feed.';

        return responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const StartIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'StartIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        sessionAttributes.prevIntent = 'StartIntent';
        attributesManager.setPersistentAttributes(sessionAttributes);

        const speechText = 'In the news today we have: Trump, Russian Secret Spilling Site and California Wildfires. What would you like to know more about?';

        return responseBuilder
            .speak(speechText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News', speechText)
            .getResponse();
    }
};

const SelectIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'SelectIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        let prevIntent = sessionAttributes.prevIntent;
        let prevSlotName = sessionAttributes.prevSlotName;
        let prevValue = sessionAttributes.prevSlotValue;

        const newsTitle = request.intent.slots.newsTitle;
        const newsTitleValue = newsTitle.value.toLowerCase();

        sessionAttributes.prevIntent = 'SelectIntent';
        sessionAttributes.prevSlotName = newsTitle;
        sessionAttributes.prevSlotValue = newsTitleValue;

        let responseText = '';


        if (TITLE_ONE.indexOf(newsTitleValue) !== -1) {
            if (sessionAttributes.story1Pos === 1) {
                responseText = 'There are three stories about Trump. The first story is. ' + FIRST_STORY_ONE + 'Say next to hear the second story about Trump';
                sessionAttributes.story1Pos = 2;
            } else if (sessionAttributes.story1Pos === 2) {
                responseText = FIRST_STORY_TWO + 'Say next to hear the final story about Trump';
                sessionAttributes.story1Pos = 3;
            } else if ((sessionAttributes.story1Pos === 3)) {
                responseText = FIRST_STORY_THREE + 'There are no stories left about Trump what more would you like to hear about';
                sessionAttributes.story1Pos = 4;
            } else {
                responseText = 'There are no stories left about Donald Trump. What more would you like to hear about';
                sessionAttributes.story1Pos = 5;
            }
        } else if (TITLE_TWO.indexOf(newsTitleValue) !== -1) {
            if (sessionAttributes.story2Pos === 1) {
                responseText = 'There is one story about a Russian secret-spilling site. ' + SECOND_STORY_ONE;
                sessionAttributes.story2Pos = 2;
            } else {
                responseText = 'There are no stories left about Russia. What more would you like to hear about.';
            }
        } else if (TITLE_THREE.indexOf(newsTitleValue) !== -1) {
            if (sessionAttributes.story3Pos === 1) {
                responseText = 'There is one story about Wildfires in California. ' + THIRD_STORY_ONE;
                sessionAttributes.story3Pos = 2;
            } else {
                responseText = 'There are no stories left about Wildfires in California. What more would you like to hear about.';
            }
        }

        return responseBuilder
            .speak(responseText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News', responseText)
            .getResponse();

    }
};

const RepeatIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'RepeatIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        let prevIntent = sessionAttributes.prevIntent;
        let prevSlotName = sessionAttributes.prevSlotName;
        let prevValue = sessionAttributes.prevSlotValue.toLowerCase();

        let responseText = '';

        if (prevIntent === 'SelectIntent') {
            if (TITLE_ONE.indexOf(prevValue) !== -1) {
                if (sessionAttributes.story1Pos === 2) {
                    responseText = 'The first story about trump is. ' + FIRST_STORY_ONE + '. Say next to hear the next story about Trump?';
                } else if (sessionAttributes.story1Pos === 3) {
                    responseText = 'The second story about trump is. ' + FIRST_STORY_TWO + '. Say next to hear the final story about Trump?';
                } else if ((sessionAttributes.story1Pos === 4)) {
                    responseText = 'The final story about trump is. ' + FIRST_STORY_THREE + '. What more would you like to hear about?';
                }
            } else if (TITLE_TWO.indexOf(prevValue) !== -1) {
                if (sessionAttributes.story2Pos === 2) {
                    responseText = SECOND_STORY_ONE;
                } else {
                    responseText = 'There are no stories left about Russia. What more would you like to hear about?';
                }
            } else if (TITLE_THREE.indexOf(prevValue) !== -1) {
                if (sessionAttributes.story3Pos === 2) {
                    responseText = THIRD_STORY_ONE;
                } else {
                    responseText = 'There are no stories left about Wildfires in California. What more would you like to hear about?';
                }
            }
        }

        if (responseText === '') {
            responseText = 'There is nothing to repeat. What would you like to hear about?';
        }

        return responseBuilder
            .speak(responseText)
            .reprompt("What would you like to know more about?")
            .withSimpleCard('News Feed', responseText)
            .getResponse();
    }
};

const PreviousIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'PreviousIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        let responseText = '';

        let prevValue = sessionAttributes.prevSlotValue.toLowerCase();

        if (TITLE_ONE.indexOf(prevValue) !== -1) {
            if (sessionAttributes.story1Pos === 2) {
                responseText = 'The first story about Trump is. ' + FIRST_STORY_ONE + '. Say next to hear the second story about Trump.';
            } else if (sessionAttributes.story1Pos === 3) {
                responseText = 'The first story about Trump is. ' + FIRST_STORY_ONE + '. Say next to hear the second story about Trump.';
                sessionAttributes.story1Pos = 2;
            } else if ((sessionAttributes.story1Pos === 4)) {
                responseText = 'The second story about Trump is. ' + FIRST_STORY_TWO + '. Say next to hear the final story about Trump.';
                sessionAttributes.story1Pos = 3;
            } else {
                responseText = 'The final story about trump is. ' + FIRST_STORY_THREE + '. What more would you like to hear about';
                sessionAttributes.story1Pos = 4;
            }
        } else if (TITLE_TWO.indexOf(prevValue) !== -1) {
            responseText = 'There is one story about a Russian secret-spilling site. ' + SECOND_STORY_ONE;
            sessionAttributes.story2Pos = 2;
        } else if (TITLE_THREE.indexOf(prevValue) !== -1) {
            responseText = 'There is one story about Wildfires in California. ' + THIRD_STORY_ONE;
            sessionAttributes.story3Pos = 2;
        }

        return responseBuilder
            .speak(responseText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News Feed', responseText)
            .getResponse();
    }
};

const NextIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'NextIntent';
    },
    handle(handlerInput) {
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        let responseText = '';

        let prevValue = sessionAttributes.prevSlotValue.toLowerCase();

        if (TITLE_ONE.indexOf(prevValue) !== -1) {
            if (sessionAttributes.story1Pos === 2) {
                responseText = 'The second story about trump is. ' + FIRST_STORY_TWO + '. Say next to hear the final story about Trump';
                sessionAttributes.story1Pos = 3;
            } else if ((sessionAttributes.story1Pos === 3)) {
                responseText = 'The final story about trump is. ' + FIRST_STORY_THREE + '. What more would you like to hear about';
                sessionAttributes.story1Pos = 4;
            } else {
                responseText = 'There are no stories left about Donald Trump. What more would you like to hear about';
                sessionAttributes.story1Pos = 5;
            }
        } else if (TITLE_TWO.indexOf(prevValue) !== -1) {
            responseText = 'There are no stories left about Russia. What more would you like to hear about.';
        } else if (TITLE_THREE.indexOf(prevValue) !== -1) {
            responseText = 'There are no stories left about Wildfires in California. What more would you like to hear about.';
        }

        return responseBuilder
            .speak(responseText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News Feed', responseText)
            .getResponse();
    }
};

const ElaborateIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'ElaborateIntent';
    },
    handle(handlerInput) {
        const request = handlerInput.requestEnvelope.request;
        const attributesManager = handlerInput.attributesManager;
        const responseBuilder = handlerInput.responseBuilder;
        const sessionAttributes = attributesManager.getSessionAttributes();

        let responseText = '';
        const followUpText = 'Say Repeat to repeat the main article or Next to go to the next article about ' + sessionAttributes.prevSlotValue;

        const newsEntity = request.intent.slots.newsEntities;
        const newsEntityValue = newsEntity.value.toLowerCase();

        if (ENTITY_ONE_ONE.indexOf(newsEntityValue) !== -1) {
            responseText = FIRST_STORY_ONE_ENTITY;
        } else if (ENTITY_ONE_TWO.indexOf(newsEntityValue) !== -1) {
            responseText = FIRST_STORY_TWO_ENTITY;
        } else if (ENTITY_ONE_THREE.indexOf(newsEntityValue) !== -1) {
            responseText = FIRST_STORY_THREE_ENTITY;
        } else if (ENTITY_TWO_ONE.indexOf(newsEntityValue) !== -1) {
            responseText = SECOND_STORY_ONE_ENTITY;
        } else if (ENTITY_THREE_ONE.indexOf(newsEntityValue) !== -1) {
            responseText = THIRD_STORY_ONE_ENTITY;
        }

        responseText = responseText + followUpText;

        return responseBuilder
            .speak(responseText)
            .reprompt("What would you like to know more about")
            .withSimpleCard('News Feed', responseText)
            .getResponse();
    }
};

const HelpIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && handlerInput.requestEnvelope.request.intent.name === 'AMAZON.HelpIntent';
    },
    handle(handlerInput) {
        const speechText = 'You can say hello to me!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .reprompt(speechText)
            .withSimpleCard('Hello World', speechText)
            .getResponse();
    }
};

const CancelAndStopIntentHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'IntentRequest'
            && (handlerInput.requestEnvelope.request.intent.name === 'AMAZON.CancelIntent'
                || handlerInput.requestEnvelope.request.intent.name === 'AMAZON.StopIntent');
    },
    handle(handlerInput) {
        const speechText = 'This demo is brought to you by Tom, Wayne and Sushma!';

        return handlerInput.responseBuilder
            .speak(speechText)
            .withSimpleCard('News Feed', speechText)
            .getResponse();
    }
};

const SessionEndedRequestHandler = {
    canHandle(handlerInput) {
        return handlerInput.requestEnvelope.request.type === 'SessionEndedRequest';
    },
    handle(handlerInput) {
        //any cleanup logic goes here
        return handlerInput.responseBuilder
            .speak("Goodbye Wayne, Tom and Sushma")
            .withSimpleCard('Bye', "Goodbye Wayne, Tom and Sushma")
            .getResponse();
    }
};

const ErrorHandler = {
    canHandle() {
        return true;
    },
    handle(handlerInput, error) {
        console.log(`Error handled: ${error.message}`);

        return handlerInput.responseBuilder
            .speak('Sorry, I can\'t understand the command. Please say again.')
            .reprompt('Sorry, I can\'t understand the command. Please say again.')
            .getResponse();
    },
};

exports.handler = Alexa.SkillBuilders.standard()
    .addRequestHandlers(LaunchRequestHandler,
        StartIntentHandler,
        SelectIntentHandler,
        RepeatIntentHandler,
        PreviousIntentHandler,
        NextIntentHandler,
        ElaborateIntentHandler,
        HelpIntentHandler,
        CancelAndStopIntentHandler,
        SessionEndedRequestHandler
    )
    .addErrorHandlers(ErrorHandler)
    .withTableName('interact2')
    .withAutoCreateTable(true)
    .withDynamoDbClient(
        new aws.DynamoDB({ apiVersion: "latest", region: "us-east-1" })
    )
    .lambda();
