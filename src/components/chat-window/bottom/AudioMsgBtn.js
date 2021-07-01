import React, { useCallback, useState } from 'react';
import { Alert, Icon, InputGroup } from 'rsuite';
import { ReactMic } from 'react-mic';
import { useParams } from 'react-router';
import { storage } from '../../../misc/firebase';

export const AudioMsgBtn = ({ afterUpload }) => {
  const [isRecording, setIsRecording] = useState(false);

  const [isUploading, setIsUploading] = useState(false);
  const { chatId } = useParams();

  const onClick = useCallback(() => {
    setIsRecording(p => !p);
  }, []);

  const onUpload = useCallback(
    async data => {
      setIsUploading(true);
      try {
        const snap = await storage
          .ref(`/chat/${chatId}`)
          .child(`audio_${Date.now()}.mp3`)
          .put(data.blob, {
            cacheControl: `public, max-age= ${3600 * 24 * 3}`,
          });

        const file = {
          contentType: snap.metadata.contentType,
          name: snap.metadata.name,
          url: await snap.ref.getDownloadURL(),
        };

        setIsUploading(false);

        afterUpload([file]);
      } catch (error) {
        setIsUploading(false);
        Alert.error(error.message);
      }
    },
    [afterUpload, chatId]
  );
  return (
    <InputGroup.Button
      onClick={onClick}
      disabled={isUploading}
      className={isRecording ? 'animate-blink' : ''}
    >
      <Icon icon="microphone" />
      <ReactMic
        record={isRecording}
        className="d-none"
        onStop={onUpload}
        mineType="audio/mp3"
      />
    </InputGroup.Button>
  );
};
