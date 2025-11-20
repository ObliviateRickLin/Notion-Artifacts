import { Octokit } from "octokit";

export async function createGist(token: string, content: string, description: string = "Created via Notion Artifacts") {
    const octokit = new Octokit({ auth: token });

    const response = await octokit.request('POST /gists', {
        description: description,
        public: true,
        files: {
            'artifact.html': {
                content: content
            }
        },
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    return response.data;
}

export async function getGist(id: string, token?: string) {
    const octokit = new Octokit({ auth: token }); // Token is optional for public gists but helps with rate limits

    const response = await octokit.request('GET /gists/{gist_id}', {
        gist_id: id,
        headers: {
            'X-GitHub-Api-Version': '2022-11-28'
        }
    });

    return response.data;
}
