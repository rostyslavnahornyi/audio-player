import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { LeftBar, Player, QueueItem } from "../../Components";
import {
    sortableContainer,
    sortableElement,
    sortableHandle,
} from "react-sortable-hoc";
import { arrayMoveImmutable } from "array-move";
import "./style.scoped.scss";
import { createSelector } from "reselect";
import { actionSetQueue } from "../../redux/actions/creators/audio";

const getQueue = createSelector(
    (state) => state.audio.queue,
    (queue) => queue
);

const DragHandle = sortableHandle(() => DragIcon);

const SortableItem = sortableElement(({ track }) => (
    <QueueItem key={track._id} data={track} dragHandle={<DragHandle />} />
));

const SortableContainer = sortableContainer(({ children }) => {
    return <div>{children}</div>;
});

const Queue = () => {
    const queue = useSelector(getQueue);
    const dispatch = useDispatch();

    const onSortEnd = ({ oldIndex, newIndex }) => {
        dispatch(
            actionSetQueue({
                ...queue,
                tracks: arrayMoveImmutable(queue.tracks, oldIndex, newIndex),
            })
        );
    };

    return (
        <div className="queue">
            <div className="main">
                <LeftBar />
                <main className="content">
                    <div className="wrapper">
                        <div className="header">
                            <h1 className="page-name">
                                Queue
                                {queue?.name ? ` | ${queue.name}` : null}
                            </h1>
                        </div>
                        <div className="track-list">
                            <SortableContainer
                                onSortEnd={onSortEnd}
                                useDragHandle
                            >
                                {queue?.tracks?.length > 0
                                    ? queue.tracks.map((track, index) => (
                                          <SortableItem
                                              key={track._id}
                                              index={index}
                                              track={track}
                                          />
                                      ))
                                    : null}
                            </SortableContainer>
                        </div>
                    </div>
                </main>
            </div>
            <Player />
        </div>
    );
};

export default Queue;
