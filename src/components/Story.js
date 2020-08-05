import React, { useState, useEffect, memo } from 'react';
import { getStory } from '../services/hackerNewsApi';
import { StoryWrapper, StoryTitle, StoryMeta, StoryMetaElement } from '../styles/storyStyles';
import { mapTime } from "../mappers/mapTime";

export const Story = memo(function Story({ storyId }) {
    const [story, setStory] = useState({});

    useEffect(() => {
        getStory(storyId).then(data => data && data.url && setStory(data));
    }, []);

    return story && story.url ? (
        <StoryWrapper data-testid="story">
            <StoryTitle>
                <a href={story.url} target="_blank" rel="noopener noreferrer">{story.title}</a>
            </StoryTitle>
            <StoryMeta>
                <span data-testid="story-by">
                    <StoryMetaElement color="#000">By:</StoryMetaElement> {story.by}
                </span>
                <span data-testid="story-time">
                    <StoryMetaElement color="#000">  Posted: </StoryMetaElement>
                    {mapTime(story.time)} ago
                </span>
            </StoryMeta> 
        </StoryWrapper>
    ) : null; 
});