from unittest.mock import MagicMock


def test_transcript_to_post_missing_transcript(client):
    response = client.post('/assistant/transcript-to-post', json={})

    assert response.status_code == 400
    assert response.json == {"message": "No transcript provided"}


def test_transcript_to_post_success(client, mocker):
    mocker.patch(
        'fb_assistant.openai_client.chat.completions.create',
        return_value=MagicMock(
            choices=[
                MagicMock(
                    finish_reason="stop",
                    message=MagicMock(
                        content="Transformed Facebook post content"
                    )
                )
            ]
        )
    )

    response = client.post('/assistant/transcript-to-post', json={"transcript": "sample transcript"})

    assert response.status_code == 200
    assert response.json == {"message": "Transformed Facebook post content"}


def test_transcript_to_post_openai_error(client, mocker):
    error = "API error"
    mocker.patch(
        'fb_assistant.openai_client.chat.completions.create',
        side_effect=Exception(error)
    )

    response = client.post('/assistant/transcript-to-post', json={"transcript": "sample transcript"})

    assert response.status_code == 500
    assert response.json == {"message": error}


def test_transcript_to_post_response_cut_off(client, mocker):
    mock_message = "Partially transformed Facebook post content"
    mocker.patch(
        'fb_assistant.openai_client.chat.completions.create',
        return_value=MagicMock(
            choices=[
                MagicMock(
                    finish_reason="length",
                    message=MagicMock(
                        content=mock_message
                    )
                )
            ]
        )
    )


    response = client.post('/assistant/transcript-to-post', json={"transcript": "sample transcript"})

    assert response.status_code == 200
    assert response.json == {
        "message": mock_message,
        "note": "Response was cut off due to length."
    }


def test_transcript_to_post_unexpected_finish_reason(client, mocker):
    mock_message = "Unexpected finish reason content"
    mocker.patch(
        'fb_assistant.openai_client.chat.completions.create',
        return_value=MagicMock(
            choices=[
                MagicMock(
                    finish_reason="other_reason",
                    message=MagicMock(
                        content=mock_message
                    )
                )
            ]
        )
    )

    response = client.post('/assistant/transcript-to-post', json={"transcript": "sample transcript"})

    assert response.status_code == 400
    assert response.json == {"message": "Assistant failed while processing the request"}