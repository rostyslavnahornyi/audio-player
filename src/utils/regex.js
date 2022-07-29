const regexAudioExtensions = /\.(?:mp3|m4a|flac|mp4|wav|wma|aac)$/;

export const removeAudioExtension = (name) =>
    name.replace(regexAudioExtensions, "");
