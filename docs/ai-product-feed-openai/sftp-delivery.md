# SFTP Delivery

![SFTP Delivery to OpenAI panel with host, port, username, password, private key and remote directory](./images/configuration-sftp.png)

During merchant onboarding, OpenAI may give you an SFTP location to upload feeds to. Turn this on and UnoPim uploads **every** newly generated feed there automatically.

| Field | What it does |
|---|---|
| **Upload to OpenAI via SFTP** | Turns automatic upload on or off. |
| **SFTP Host** \* | The server name OpenAI gave you. Required when upload is on. |
| **SFTP Port** | Usually `22`. |
| **SFTP Username** \* | Your SFTP user. Required when upload is on. |
| **SFTP Password** | Your SFTP password. |
| **SFTP Private Key** | Alternatively, paste a private key (`-----BEGIN OPENSSH PRIVATE KEY-----…`). |
| **Remote Directory** | The folder on the SFTP server. Leave it blank for the account's home folder. |

- Provide **either** a password **or** a private key. Both are stored **encrypted**.
- To keep a saved password or key, leave the field blank when you save again. It is never shown back to you.
- The file is uploaded under a fixed name, `openai-product-feed.<format>` (plus `.gz` if compressed), so each upload replaces the previous one.
- If the upload fails, the feed file is still built in UnoPim. The run is marked **Failed** with the message *"The feed was generated but the SFTP upload to OpenAI failed"*. Technical details go to the application log.

This requires the SFTP library from [Installation › Step 2](./installation.md#step-2-add-the-sftp-library-optional).

---

## Set it up step by step

1. Install the SFTP library ([Installation › Step 2](./installation.md#step-2-add-the-sftp-library-optional)).
2. Open **OpenAI Feed › Configuration**, expand **SFTP Delivery to OpenAI**, turn on **Upload to OpenAI via SFTP** and enter the host, port, username and password or private key that OpenAI gave you.
3. In the [General card](./general-settings.md), set **Format** to **TSV** or **JSONL** and turn on **Gzip Compress**, as OpenAI recommends for SFTP.
4. Save, then click **Generate Now**.
5. Check the generation history. A **Success** row means the upload worked. When you generate from the terminal, the summary shows *Uploaded via SFTP: Yes (host)*.

From now on, every manual and scheduled generation uploads automatically, replacing `openai-product-feed.tsv.gz` (or `.jsonl.gz`) on the server.

---

[← Schedule & Performance](./schedule-performance.md) · [Settings History →](./settings-history.md)
